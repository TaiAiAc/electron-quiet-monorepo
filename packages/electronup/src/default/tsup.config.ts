import { resolve } from 'path'
import type { Options } from 'tsup'
import { config as getEnv } from 'dotenv'
import type { ElectronupConfig, TsupConfig } from '../typings/electronup'
import { store } from '../utils'
import { startElectron } from './startElectron'

const defaultEnvPath = resolve(store.root, '.env')
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

const injectEnv = () => {
  const { command, port } = store

  if (command === 'serve') {
    const env = getDevelopment()
    return {
      ...env.default,
      ...env.development,
      NODE_ENV: 'development',
      RENDER_PORT: String(port)
    }
  }

  if (command === 'build') {
    const env = getProduction()
    return {
      ...env.default,
      ...env.production,
      NODE_ENV: 'production'
    }
  }

  throw new Error('未匹配到 command 指令')
}

export function getTsupConfig(config: TsupConfig, allConfig: ElectronupConfig) {
  const { command, root, mainDir, resourceDir } = store

  const defaultConfig: Options = {
    minify: false,
    ...config,
    external: ['electron', ...(config.external ? config.external : [])],
    entry: { electron: resolve(root, allConfig.mainDir || mainDir, 'index.ts') },
    outDir: allConfig.resourceDir || resourceDir,
    watch: command === 'serve',
    dts: false,
    clean: false,
    env: injectEnv(),
    async onSuccess() {
      if (command === 'serve')
        return startElectron(resolve(root, allConfig.resourceDir || resourceDir, 'electron.js'))
    }
  }

  return defaultConfig
}

