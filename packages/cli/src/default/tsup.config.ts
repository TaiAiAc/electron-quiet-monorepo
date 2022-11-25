import { resolve } from 'path'
import type { Options } from 'tsup'
import { config as getEnv } from 'dotenv'
import type { TsupConfig } from '../typings/electronup'
import { env } from '../utils'
import { startElectron } from './startElectron'

const defaultEnvPath = resolve(process.cwd(), '.env')
const { parsed: defaultEnv } = getEnv({ path: defaultEnvPath })

export const getDevelopment = () => {
  const { parsed: env } = getEnv({ path: resolve(defaultEnvPath, '.development') })

  return {
    default: defaultEnv,
    development: env
  }
}

export const getProduction = () => {
  const { parsed: env } = getEnv({ path: resolve(defaultEnvPath, '.production') })

  return {
    default: defaultEnv,
    production: env
  }
}

const injectEnv = (command: 'build' | 'serve', port: number) => {
  if (command === 'serve') {
    const env = getDevelopment()
    return { ...env.default, ...env.development, RENDER_PORT: String(port) }
  }

  if (command === 'build') {
    const env = getProduction()
    return { ...env.default, ...env.production }
  }

  throw new Error('未匹配到 command 指令')
}

export function getTsupConfig(config: TsupConfig, port: number) {
  const { command } = env

  const defaultConfig: Options = {
    minify: false,
    ...config,
    external: ['electron', ...(config.external ? config.external : [])],
    entry: { electron: resolve(process.cwd(), 'main/index.ts') },
    watch: command === 'serve',
    dts: false,
    clean: command === 'build',
    env: injectEnv(command, port),
    async onSuccess() {
      if (command === 'serve')
        return startElectron(resolve(process.cwd(), 'dist/electron.js'))
    }
  }

  return defaultConfig
}

