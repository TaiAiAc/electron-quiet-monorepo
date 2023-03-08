import { BrowserWindow } from 'electron'

interface Options extends Electron.BrowserWindowConstructorOptions { }
type BackOptions = Options & { target: Electron.BrowserWindow }

function createBrowserWindow(options: Options): BackOptions {
  const win = new BrowserWindow(options)

  return new Proxy({ ...options, target: win }, {
    get(target, key: string, receiver) {
      console.log(`getting ${key}!`)
      return Reflect.get(target, key, receiver)
    },
    set(target, key: string, value: any, receiver) {
      switch (key) {
        case 'width':
          win.setSize(value, win.getSize()[1])
          break
        case 'height':
          win.setSize(win.getSize()[0], value)
          break
        case 'x':
          win.setSize(win.getSize()[0], value)
          break
        case 'y':
          win.setSize(win.getSize()[0], value)
          break
        case 'center':
          win.setSize(win.getSize()[0], value)
          break
        case 'title':
          win.setSize(win.getSize()[0], value)
          break
        case 'show':
          value ? win.show() : win.hide()
          break
      }

      return Reflect.set(target, key, value, receiver)
    }
  })
}

const winObj = createBrowserWindow({ show: true, width: 1000, height: 700, icon: './icon.png' })

winObj.width = 500
winObj.height = 500
winObj.center = true
winObj.title = 'Hello World!'
winObj.show = false
