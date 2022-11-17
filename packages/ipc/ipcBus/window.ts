import { BrowserWindow } from 'electron'
import { IpcWindowOptions } from '../event-enum'

export const ipcBus = new Map<IpcWindowOptions, (event: Electron.IpcMainEvent, state?: any) => void>()

const getWin = (event: Electron.IpcMainEvent) => BrowserWindow.fromWebContents(event.sender)

// 销毁窗口 触发closed事件
ipcBus.set(IpcWindowOptions.DESTROY, event => getWin(event)?.destroy())

// 字面意思
ipcBus.set(IpcWindowOptions.SHOW, event => getWin(event)?.show())
ipcBus.set(IpcWindowOptions.HIDE, event => getWin(event)?.hide())
ipcBus.set(IpcWindowOptions.FOCUS, event => getWin(event)?.focus())
ipcBus.set(IpcWindowOptions.BLUR, event => getWin(event)?.blur())
ipcBus.set(IpcWindowOptions.MAXIMIZE, event => getWin(event)?.maximize())
ipcBus.set(IpcWindowOptions.UNMAXIMIZE, event => getWin(event)?.unmaximize())
ipcBus.set(IpcWindowOptions.MINIMIZE, event => getWin(event)?.minimize())
ipcBus.set(IpcWindowOptions.RESTORE, event => getWin(event)?.restore())
ipcBus.set(IpcWindowOptions.RELOAD, event => getWin(event)?.reload())
// 设置全屏
ipcBus.set(IpcWindowOptions.SET_FULL_SCREEN, (event, flag: boolean) => getWin(event)?.setSimpleFullScreen(flag))
ipcBus.set(IpcWindowOptions.SET_TITLE, (event, title: string) => getWin(event)?.setTitle(title))
// 任务栏闪烁
ipcBus.set(IpcWindowOptions.FLASH_FRAME, (event, flag: boolean) => getWin(event)?.flashFrame(flag))
