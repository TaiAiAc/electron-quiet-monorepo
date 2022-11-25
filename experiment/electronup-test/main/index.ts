import { BrowserWindow, app } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    height: 700, width: 800
  })

  console.log('port', process.env.RENDER_PORT)
  console.log('pro :>> ', process.env.VITE_TEST)

  win.loadURL(`http://localhost:${process.env.RENDER_PORT}`)
  win.webContents.openDevTools({ mode: 'right' })

  console.log('app.getVersion(): ', app.getVersion())
  console.log('app.getAppPath(): ', app.getAppPath())
  console.log('app.getName(): ', app.getName())
  console.log('app.getLocale(): ', app.getLocale())
  console.log('app.getSystemLocale(): ', app.getSystemLocale())
  console.log('app.getLocaleCountryCode(): ', app.getLocaleCountryCode())
  console.log('app.hasSingleInstanceLock(): ', app.hasSingleInstanceLock())
  console.log('app.getAppMetrics(): ', app.getAppMetrics())
  console.log('app.getGPUFeatureStatus(): ', app.getGPUFeatureStatus())
  console.log('app.getBadgeCount(): ', app.getBadgeCount())
  console.log('app.isEmojiPanelSupported(): ', app.isEmojiPanelSupported())
  app.showEmojiPanel()
  console.log('app.commandLine: ', app.commandLine)
  console.log('app.dock: ', app.dock)
  console.log('app.isPackaged: ', app.isPackaged)
  console.log('app.name: ', app.name)
  console.log('app.userAgentFallback: ', app.userAgentFallback)
})

