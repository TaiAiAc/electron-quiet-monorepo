type Command = 'build' | 'serve'
type Mode = 'development' | 'production' | 'test' | 'staging' | string

class Store {
  static instance: Store

  #command: Command
  #mode: Mode
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

  get mode() {
    return this.#mode
  }

  get port() {
    return this.#port
  }

  setCommand(command: Command) {
    this.#command = command
  }

  setMode(mode: Mode) {
    this.#mode = mode
  }

  setPort(port: number) {
    this.#port = port
  }
}

export const store = Store.getInstance()
