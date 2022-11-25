type Command = 'build' | 'serve'

class Store {
  static instance: Store

  #command: Command
  #port: number | undefined

  static getInstance() {
    if (this.instance)
      return this.instance
    return (this.instance = new Store())
  }

  get root() {
    return process.cwd()
  }

  get command() {
    return this.#command
  }

  get port() {
    return this.#port
  }

  /* 渲染进程入口目录 */
  get renderDir() {
    return 'render'
  }

  /* 主进程入口目录 */
  get mainDir() {
    return 'main'
  }

  /* 静态资源目录 */
  get publicDir() {
    return 'public'
  }

  /* 动态库目录 */
  get libDir() {
    return 'lib'
  }

  /* 资源构建输出目录 */
  get resourceDir() {
    return 'dist'
  }

  /* electron-builder 输出目录 */
  get outDir() {
    return 'out'
  }

  setCommand(command: Command) {
    this.#command = command
  }

  setPort(port: number) {
    this.#port = port
  }
}

export const store = Store.getInstance()
