import { clipboard, contextBridge, crashReporter, nativeImage, webFrame } from 'electron'
import type { PreloadIpc } from './ipcRenderer'
import type { PreLoadPath } from './path'
import { $path } from './path'
import { $ipc } from './ipcRenderer'

contextBridge.exposeInMainWorld('$ipc', $ipc)
contextBridge.exposeInMainWorld('$clipboard', clipboard)
contextBridge.exposeInMainWorld('$crashReporter', crashReporter)
contextBridge.exposeInMainWorld('$nativeImage', nativeImage)
contextBridge.exposeInMainWorld('$webFrame', webFrame)

contextBridge.exposeInMainWorld('$path', $path)

type PreloadClipboard = Electron.Clipboard
type PreloadCrashReporter = Electron.Clipboard
type PreloadNativeImage = Electron.Clipboard
type PreloadWebFrame = Electron.Clipboard

export type { PreloadIpc, PreLoadPath, PreloadClipboard, PreloadCrashReporter, PreloadNativeImage, PreloadWebFrame }
