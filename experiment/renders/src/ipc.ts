import { EventKeys, IpcWindowOptions } from '@quiteer/electron-ipc/web'

export default async () => {
  window.$ipc.send(EventKeys.WindowOptionsKey, IpcWindowOptions.MAXIMIZE)
  setTimeout(() => {
    window.$ipc.send(EventKeys.WindowOptionsKey, IpcWindowOptions.UNMAXIMIZE)
  }, 1000)
}
