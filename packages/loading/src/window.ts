import { BrowserWindow } from 'electron'

export function createLoadingWindow(filePath: string, callback: () => void) {
  const win = new BrowserWindow({
    width: 480,
    height: 600

  })

  win.loadFile(filePath)

  win.webContents.on('dom-ready', () => {
    callback()

    setTimeout(() => {
      // win.destroy()
    }, 2000)
  })
}
