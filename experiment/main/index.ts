import preload from '@quiteer/electron-preload'
import { BrowserWindow, app } from 'electron'
import { Ipc } from '@quiteer/electron-ipc'
import { DoraemonPath, createLoadingWindow } from '@quiteer/electron-loading'
console.log('DoraemonPath: ', DoraemonPath)

global.console.log('preload: ', preload)

app.whenReady().then(() => {
  // createWindow()
  Ipc.init()
  createLoadingWindow(DoraemonPath, () => {
    console.log('1111111111111')
  })
})

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: false,
      preload: preload as string
    }
  })

  win.loadURL('http://127.0.0.1:5173/')
  win.webContents.openDevTools({ mode: 'undocked' })
}
