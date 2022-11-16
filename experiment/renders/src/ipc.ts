import { EventKeys, IpcWindowOptions } from '@quiteer/electron-ipc/enums'

export default async () => {
  window.$ipc.send(EventKeys.WindowOptionsKey, IpcWindowOptions.MAXIMIZE)
  setTimeout(() => {
    window.$ipc.send(EventKeys.WindowOptionsKey, IpcWindowOptions.HIDE)
  }, 1000)
}
