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

  win.loadFile('http://127.0.0.1:5173/')
  win.webContents.openDevTools()
}
