
declare module '@quiteer/electron-preload' {
 export interface PreloadIpc {
    send(
      channel:import('./eventKays').EventKeys.WindowOptionsKey,
      type: import('./options').IpcWindowOptions
    ): void

    send(
      channel:'xxxx',
      type: 'xxxx'
    ): void

    invoke(
      channel:import('./eventKays').EventKeys.WindowOptionsKey,
      type: import('./options').IpcWindowOptions
    ): Promise<any>
  }
}


export { EventKeys } from './eventKays'
export { IpcWindowOptions, IpcFileOptions } from './options'

export interface ExpandPreloadIpc{
  send(
    channel:'xxxx',
    type: 'xxxx'
  ): void
}
