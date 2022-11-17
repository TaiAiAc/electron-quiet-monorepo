import { ipcMain } from 'electron'
import type { IpcWindowOptions } from './event-enum'
import { EventKeys } from './event-enum'
import { windowBus } from './ipcBus'

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
    ipcMain.removeAllListeners(EventKeys.WindowOptionsKey)
  }

  #window() {
    ipcMain.on(EventKeys.WindowOptionsKey, (event: Electron.IpcMainEvent, type: IpcWindowOptions, args) => {
      const performFunc = windowBus.get(type)
      if (performFunc instanceof Function)
        return performFunc(event, args)
    })
  }
}

export const Ipc = IpcOpt.getInstance()
