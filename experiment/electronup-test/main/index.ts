import { BrowserWindow, app } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    height: 600, width: 800
  })

  console.log('pro :>> ', process.env.VITE_TEST)

  win.loadURL('http://localhost:8090')
  win.webContents.openDevTools()
})
