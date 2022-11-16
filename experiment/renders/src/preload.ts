export default async () => {
  window.console.log('window.$ipc :>> ', window.$ipc)
  /**
   * 无参数演示
   */
  window.$ipc.send('test-send')

  /**
    * 有参数 传入范型 获取类型提示
    */
  window.$ipc.send<[number]>('test-send', 1)
  window.$ipc.send<[number, string]>('test-send', 1, '2')

  /**
   * 获得返回值类型提示
   */
  const backPromise = await window.$ipc.invoke<[string, number], number>('test-invoke', '1', 1)
  window.console.log('backPromise: ', backPromise)
}

