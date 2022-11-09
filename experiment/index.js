const { app, BrowserWindow } = require('electron')
const { Ipc } = require('@quiteer/electron-ipc')
const preload = require('@quiteer/electron-preload')

console.log('preload: ', preload)

app.whenReady().then(() => {
  createWindow()
  Ipc.init()
})

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    preload
  })

  win.loadFile('./index.html')
  win.webContents.openDevTools()
}
