import type { Options } from 'tsup'
import type { ConfigEnv, ElectronupConfig, UserTsupConfig, UserTsupConfigFn } from '../typings/electronup'
import { getConfig } from './getConfig'
import { getDevelopment, getProduction } from './getEnv'

const callTsupOptions = (userConfig: UserTsupConfig, configEnv: ConfigEnv) => {
  const type = typeof userConfig
  if (type === 'function') {
    const options: Options | Options[] = (userConfig as UserTsupConfigFn)(configEnv)
    return options
  }
  return userConfig as Options | Options[]
}

const createEnvObj = (injects: Record<string, string>) => {
  return Object.entries(injects).reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {})
}

const injectEnv = (command: 'build' | 'serve', options: ElectronupConfig) => {
  if (command === 'serve') {
    const env = getDevelopment()
    const injects = { ...env.default, ...env.development }

    const tsupConfig = callTsupOptions(options.tsupConfig, { command })

    if (Array.isArray(tsupConfig)) {
      tsupConfig.forEach((option) => {
        option.env = createEnvObj(injects)
      })
    }
    else {
      tsupConfig.env = createEnvObj(injects)
    }
  }

  if (command === 'build') {
    const env = getProduction()
    const injects = { ...env.default, ...env.production }

    const tsupConfig = callTsupOptions(options.tsupConfig, { command })

    if (Array.isArray(tsupConfig)) {
      tsupConfig.forEach((option) => {
        option.env = createEnvObj(injects)
      })
    }
    else {
      tsupConfig.env = createEnvObj(injects)
    }
  }

  return options
}

export const transform = async (configPath: string | undefined, command: 'build' | 'serve') => {
  const options = await getConfig(configPath)

  return injectEnv(command, options)
}
