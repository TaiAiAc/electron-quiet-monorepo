import { ipcMain } from 'electron'
import type { IpcWindowOptions } from './enums/options'
import { ipcBus } from './modules/window'
import { WindowOptionsKey } from './eventKeys'

class IpcOpt {
  static #instance: IpcOpt | null = null
  constructor() { }

  static getInstance() {
    if (!this.#instance)
      return (this.#instance = new IpcOpt())
    else
      return this.#instance
  }

  init() {
    this.#window()
  }

  destroy() {
    ipcMain.removeAllListeners(WindowOptionsKey)
  }

  #window() {
    ipcMain.on(WindowOptionsKey, (event: Electron.IpcMainEvent, type: IpcWindowOptions, args) => {
      const performFunc = ipcBus.get(type)
      if (performFunc instanceof Function)
        return performFunc(event, args)
    })
  }
}

export const Ipc = IpcOpt.getInstance()
