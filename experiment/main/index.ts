import preload from '@quiteer/electron-preload'
import { BrowserWindow, app } from 'electron'
import { Ipc } from '@quiteer/electron-ipc'

global.console.log('preload: ', preload)

app.whenReady().then(() => {
  createWindow()
  Ipc.init()
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
