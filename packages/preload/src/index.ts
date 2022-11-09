import { contextBridge } from 'electron'
import type { PreloadIpc } from './ipcRenderer'
import type { PreLoadPath } from './path'
import type { PreloadClipboard } from './clipboard'
import { $clipboard } from './clipboard'
import { $path } from './path'
import { $ipc } from './ipcRenderer'
import type { PreloadWebFrame } from './webFrame'
import { $webFrame } from './webFrame'

contextBridge.exposeInMainWorld('$ipc', $ipc)
contextBridge.exposeInMainWorld('$clipboard', $clipboard)
contextBridge.exposeInMainWorld('$webFrame', $webFrame)

contextBridge.exposeInMainWorld('$path', $path)

export type { PreloadIpc, PreLoadPath, PreloadClipboard, PreloadWebFrame }

