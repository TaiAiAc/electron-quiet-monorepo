import type { ParsedPath } from 'node:path'

/**
   * 窗口操作
   */
interface ExpandPreloadIpc {
  /**
   * 销毁窗口
   */
  send(channel: '__window_options__', type: 'destroy'): void
  /**
   * 窗口显示
   */
  send(channel: '__window_options__', type: 'show'): void
  /**
   * 窗口隐藏
   */
  send(channel: '__window_options__', type: 'hide'): void
  /**
   * 窗口获取焦点
   */
  send(channel: '__window_options__', type: 'focus'): void
  /**
   * 窗口失去焦点
   */
  send(channel: '__window_options__', type: 'blur'): void
  /**
   * 窗口最大化
   */
  send(channel: '__window_options__', type: 'maximize'): void
  /**
   * 取消窗口最大化
   */
  send(channel: '__window_options__', type: 'unmaximize'): void
  /**
   * 窗口最小化
   */
  send(channel: '__window_options__', type: 'minimize'): void
  /**
   * 还原窗口
   */
  send(channel: '__window_options__', type: 'restore'): void
  /**
   * 刷新窗口
   */
  send(channel: '__window_options__', type: 'reload'): void
  /**
   * 窗口全屏
   */
  send(channel: '__window_options__', type: 'setFullScreen', flag: boolean): void
  /**
   * 设置窗口
   */
  send(channel: '__window_options__', type: 'setTitle', title: string): void
  /**
   * 任务栏闪烁
   */
  send(channel: '__window_options__', type: 'flashFrame', flag: boolean): void
}

/**
   * 文件操作
   */
interface ExpandPreloadIpc {
  /**
   * path.basename
   */
  invoke(channel: '__file_options__', type: 'basename', path: string, suffix?: string): Promise<string>
  /**
  * path.dirname
  */
  invoke(channel: '__file_options__', type: 'dirname', path: string): Promise<string>
  /**
   * path.extname
   */
  invoke(channel: '__file_options__', type: 'extname', path: string): Promise<string>
  /**
   * path.join
   */
  invoke(channel: '__file_options__', type: 'join', ...paths: string[]): Promise<string>
  /**
   * path.parse
   */
  invoke(channel: '__file_options__', type: 'parse', path: string): Promise<ParsedPath>
  /**
   * path.relative
   */
  invoke(channel: '__file_options__', type: 'relative', from: string, to: string): Promise<string>
  /**
   * path.resolve
   */
  invoke(channel: '__file_options__', type: 'resolve', ...paths: string[]): Promise<string>
}

export type { ExpandPreloadIpc }
export { EventKeys } from './event-enum/eventKays'
export { IpcWindowOptions, IpcFileOptions } from './event-enum/options'
export { Ipc } from './instance'
