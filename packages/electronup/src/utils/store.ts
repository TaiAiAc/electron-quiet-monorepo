type Command = 'build' | 'serve'

class Store {
  static instance: Store

  #root: string
  #command: Command
  #port: number | undefined

  constructor() {
    this.#root = process.cwd()
  }

  static getInstance() {
    if (this.instance)
      return this.instance
    return (this.instance = new Store())
  }

  get root() {
    return this.#root
  }

  get command() {
    return this.#command
  }

  get port() {
    return this.#port
  }

  setCommand(command: Command) {
    this.#command = command
  }

  setPort(port: number) {
    this.#port = port
  }
}

export const store = Store.getInstance()
