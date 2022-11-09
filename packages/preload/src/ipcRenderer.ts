import type { IpcRenderer } from 'electron'
import { ipcRenderer } from 'electron'

type IpcParameters<K extends keyof IpcRenderer> = Parameters<IpcRenderer[K]>
type IpcReturnType<K extends keyof IpcRenderer> = ReturnType<IpcRenderer[K]>

export interface PreloadIpc {
  send(...args: IpcParameters<'send'>): IpcReturnType<'send'>
  sendSync(...args: IpcParameters<'sendSync'>): IpcReturnType<'sendSync'>
  invoke(...args: IpcParameters<'invoke'>): IpcReturnType<'invoke'>
  on(...args: IpcParameters<'on'>): IpcReturnType<'on'>
  once(...args: IpcParameters<'once'>): IpcReturnType<'once'>
  removeAllListeners(...args: IpcParameters<'removeAllListeners'>): IpcReturnType<'removeAllListeners'>
}

export const $ipc: PreloadIpc = {
  send: (...args) => ipcRenderer.send(...args),
  sendSync: (...args) => ipcRenderer.sendSync(...args),
  invoke: (...args) => ipcRenderer.invoke(...args),
  on: (...args) => ipcRenderer.on(...args),
  once: (...args) => ipcRenderer.once(...args),
  removeAllListeners: (...args) => ipcRenderer.removeAllListeners(...args)
}

