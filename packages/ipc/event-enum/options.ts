export enum IpcWindowOptions {
  /**
   * 销毁窗口
   */
  DESTROY = 'destroy',
  /**
   * 窗口显示
   */
  SHOW = 'show',
  /**
   * 窗口隐藏
   */
  HIDE = 'hide',
  /**
   * 窗口获取焦点
   */
  FOCUS = 'focus',
  /**
   * 窗口失去焦点
   */
  BLUR = 'blur',
  /**
   * 窗口最大化
   */
  MAXIMIZE = 'maximize',
  /**
   * 取消窗口最大化
   */
  UNMAXIMIZE = 'unmaximize',
  /**
   * 窗口最小化
   */
  MINIMIZE = 'minimize',
  /**
   * 还原窗口
   */
  RESTORE = 'restore',
  /**
   * 刷新窗口
   */
  RELOAD = 'reload',
  /**
   * 窗口全屏
   */
  SET_FULL_SCREEN = 'setFullScreen',
  /**
   * 设置窗口
   */
  SET_TITLE = 'setTitle',
  /**
   * 任务栏闪烁
   */
  FLASH_FRAME = 'flashFrame'
}

export enum IpcFileOptions {
  /**
   * path.basename
   */
  BASENAME = 'basename',
  /**
  * path.dirname
  */
  DIRNAME = 'dirname',
  /**
   * path.extname
   */
  EXTNAME = 'extname',
  /**
  * path.join
  */
  JOIN = 'join',
  /**
  * path.parse
  */
  PARSE = 'parse',
  /**
  * path.relative
  */
  RELATIVE = 'relative',
  /**
  * path.resolve
  */
  RESOLVE = 'resolve'
}
