interface Window {
  $ipc:import('@quiteer/electron-preload').PreloadIpc & import('@quiteer/electron-ipc').ExpandPreloadIpc
  $clipboard: import('@quiteer/electron-preload').PreloadClipboard
  $webFrame: import('@quiteer/electron-preload').PreloadWebFrame
}

