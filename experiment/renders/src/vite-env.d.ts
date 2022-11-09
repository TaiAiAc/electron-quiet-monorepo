/// <reference types="vite/client" />


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


interface Window {
  $ipc:  import('@quiteer/electron-preload').PreloadIpc
  $clipboard:  import('@quiteer/electron-preload').PreLoadPath
  $webFrame:  import('@quiteer/electron-preload').PreloadWebFrame
  $path:  import('@quiteer/electron-preload').PreLoadPath
}
