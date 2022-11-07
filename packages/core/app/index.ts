import { BrowserWindow, app, dialog, powerSaveBlocker, session } from 'electron'

interface AppConfig {
  name: string
  isSingle?: boolean
  isPowerSave?: boolean
  isInstallDevtools: boolean
  mainWindow: BrowserWindow
}

class CreateApp {
  static #instance: CreateApp | null = null
  #readyList: Array<() => void> = []
  constructor() { }

  static getInstance() {
    if (!this.#instance)
      return (this.#instance = new CreateApp())
    else
      return this.#instance
  }

  use(callback: () => void) {
    app.whenReady().then(callback)
    this.#readyList.push(callback)
    return this
  }

  init(config: AppConfig) {
    app.setName(process.env.NODE_ENV ? `dev-${config.name}` : config.name)

    app.on('activate', () => {
      const allWin = BrowserWindow.getAllWindows()
      if (allWin.length)
        allWin.map(win => win.show())
      else
        this.#readyList.forEach(fn => fn())
    })

    // 由于9.x版本问题，需要加入该配置关闭跨域问题
    app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

    app.on('window-all-closed', () => {
      // 所有平台均为所有窗口关闭就退出软件
      app.quit()
    })

    this.#anomalyHandle()
    config.isSingle && this.#singleLock(config.mainWindow)
    config.isPowerSave && this.#powerSaveBlocker()
    config.isInstallDevtools && this.#installDevtools()
  }

  #installDevtools() {
    app.whenReady().then(() => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { VUEJS3_DEVTOOLS } = require('electron-devtools-vendor')
      session.defaultSession.loadExtension(VUEJS3_DEVTOOLS, { allowFileAccess: true })
    })
  }

  #powerSaveBlocker() {
    app.whenReady().then(() => {
      // 保活
      const id = powerSaveBlocker.start('prevent-display-sleep')
      setTimeout(() => {
        powerSaveBlocker.stop(id)
      }, 60000)
    })
  }

  #singleLock(mainWindow: BrowserWindow) {
    if (app.requestSingleInstanceLock()) {
      app.on('second-instance', () => {
        mainWindow?.show()
      })
    }
    else {
      app.quit()
    }
  }

  #anomalyHandle() {
    /**
     * 子进程意外消失时触发。 这种情况通常因为进程崩溃或被杀死。 子进程不包括渲染器进程。
     * @returns {void}
     * @author zmr (umbrella22)
     * @date 2020-11-27
     */
    app.on('child-process-gone', (event, details) => {
      const message = {
        title: '',
        buttons: [],
        message: ''
      }
      switch (details.type) {
        case 'GPU':
          switch (details.reason) {
            case 'crashed':
              message.title = '警告'
              message.message = '硬件加速进程已崩溃，是否关闭硬件加速并重启？'
              break
            case 'killed':
              message.title = '警告'
              message.message = '硬件加速进程被意外终止，是否关闭硬件加速并重启？'
              break
            default:
              break
          }
          break
        default:
          break
      }
      dialog
        .showMessageBox(null as any, {
          type: 'warning',
          title: message.title,
          buttons: message.buttons,
          message: message.message,
          noLink: true
        })
        .then((res) => {
          // 当显卡出现崩溃现象时使用该设置禁用显卡加速模式。
          if (res.response === 0) {
            if (details.type === 'GPU')
              app.disableHardwareAcceleration()
            app.relaunch({
              args: process.argv.slice(1).concat(['--relaunch'])
            })
            app.exit(0)
          }
          else {
            app.exit(0)
          }
        })
    })

    /**
     * 描述   渲染器进程意外消失时触发。 这种情况通常因为进程崩溃或被杀死。
     * @date 2022-03-10
     * @param {any} 'render-process-gone'
     * @param {any} (event
     * @param {any} webContents
     * @param {any} details
     * @returns {any}
     */
    app.on('render-process-gone', (event, webContents, details) => {
      switch (details.reason) {
        case 'killed':
          // 进程发送一个SIGTERM，否则是被外部杀死的。
          break
        case 'crashed':
          // 进程崩溃
          break
        case 'oom':
          // 进程内存不足
          break
        case 'launch-failed':
          // 进程从未成功启动
          break
        case 'integrity-failure':
          // 窗口代码完整性检查失败
          break
        default:
          break
      }
    })
  }
}

export const App = CreateApp.getInstance()
