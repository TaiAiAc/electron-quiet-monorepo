import { ConfigEnv } from '../typings/env'

class Env extends ConfigEnv {
  static instance: Env

  constructor() {
    super()
  }

  static getInstance() {
    if (this.instance)
      return this.instance
    return (this.instance = new Env())
  }

  setCommand(command: ConfigEnv['command']) {
    this.command = command
  }
}

export const env = Env.getInstance()
