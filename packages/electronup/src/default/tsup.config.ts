import { resolve } from 'path'
import type { Options } from 'tsup'
import { config as getEnv } from 'dotenv'
import type { ElectronupConfig, TsupConfig } from '../typings/electronup'
import { DefaultDirs, store, user } from '../utils'
import { startElectron } from './startElectron'

const defaultEnvPath = resolve(store.root, '.env')
const { parsed: defaultEnv } = getEnv({ path: defaultEnvPath })

const getModeDev = () => {
  const path = `${defaultEnvPath}.${store.mode}`
  const { parsed, error } = getEnv({ path })
  if (error)
    throw new Error(`未能加载 .env.${store.mode} 下的环境变量,检查文件是否存在！`)

  return {
    ...defaultEnv,
    ...parsed
  }
}

const injectEnv = () => {
  const { command, port } = store

  const env = getModeDev()
  if (command === 'serve') {
    return {
      ...env,
      NODE_ENV: 'development',
      RENDER_PORT: String(port)
    }
  }

  return {
    ...env,
    NODE_ENV: 'production'
  }
}

export function getTsupConfig(config: TsupConfig, allConfig: ElectronupConfig) {
  const { command, root } = store
  const isServe = command === 'serve'

  const defaultConfig: Options = {
    minify: isServe ? false : user.minify,
    ...config,
    external: ['electron', ...(config.external ? config.external : [])],
    entry: { electron: resolve(root, allConfig.mainDir || DefaultDirs.mainDir, 'index.ts') },
    outDir: allConfig.resourceDir || DefaultDirs.resourceDir,
    watch: isServe,
    dts: false,
    clean: false,
    env: injectEnv(),
    async onSuccess() {
      if (isServe)
        return startElectron(resolve(root, allConfig.resourceDir || DefaultDirs.resourceDir, 'electron.js'))
    }
  }

  return defaultConfig
}

