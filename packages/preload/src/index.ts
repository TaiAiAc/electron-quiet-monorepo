import path from 'path'
import type { Clipboard, CrashReporter, NativeImage, WebFrame } from 'electron'
import { clipboard, contextBridge, crashReporter, nativeImage, webFrame } from 'electron'
import type { PreloadIpc } from './ipcRenderer'
import type { PreLoadPath } from './path'
import { $path } from './path'
import { $ipc } from './ipcRenderer'

export default path.join(__dirname, 'index.js')

contextBridge.exposeInMainWorld('$ipc', $ipc)
contextBridge.exposeInMainWorld('$clipboard', clipboard)
contextBridge.exposeInMainWorld('$crashReporter', crashReporter)
contextBridge.exposeInMainWorld('$nativeImage', nativeImage)
contextBridge.exposeInMainWorld('$webFrame', webFrame)

contextBridge.exposeInMainWorld('$path', $path)

type PreloadClipboard = Clipboard
type PreloadCrashReporter = CrashReporter
type PreloadNativeImage = NativeImage
type PreloadWebFrame = WebFrame

export type { PreloadIpc, PreLoadPath, PreloadClipboard, PreloadCrashReporter, PreloadNativeImage, PreloadWebFrame }

