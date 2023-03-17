type Ipc = import('@quiteer/electron-preload').PreloadIpc & import('@quiteer/electron-ipc/web').ExpandPreloadIpc

interface Window {
  $ipc:Ipc
  $clipboard: import('@quiteer/electron-preload').PreloadClipboard
  $webFrame: import('@quiteer/electron-preload').PreloadWebFrame
}

