type Ipc = import('@quiteer/electron-preload').PreloadIpc & {
  send:(cancel:'dasda')=> void
}

interface Window {
  $ipc: import('@quiteer/electron-preload').PreloadIpc
  $clipboard: import('@quiteer/electron-preload').PreloadClipboard
  $webFrame: import('@quiteer/electron-preload').PreloadWebFrame
}

