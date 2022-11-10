import preload from '@quiteer/electron-preload'
import { BrowserWindow, app } from 'electron'
console.log('preload: ', preload)

app.whenReady().then(() => {
  createWindow()
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

  win.loadURL('http://127.0.0.1:5174/')
  win.webContents.openDevTools()
}