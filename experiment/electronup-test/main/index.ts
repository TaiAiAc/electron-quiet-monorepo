import { BrowserWindow, app } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    height: 700, width: 500
  })

  console.log('port', process.env.RENDER_PORT)
  console.log('pro :>> ', process.env.VITE_TEST)

  win.loadURL(`http://localhost:${process.env.RENDER_PORT}`)
  win.webContents.openDevTools()

  console.log('app.getVersion(): ', app.getVersion())
  console.log('app.getAppPath(): ', app.getAppPath())
  console.log('app.getName(): ', app.getName())
  console.log('app.getLocale(): ', app.getLocale())
  console.log('app.getSystemLocale(): ', app.getSystemLocale())
  console.log('app.getLocaleCountryCode(): ', app.getLocaleCountryCode())
  app.getSystemLocale()
})

