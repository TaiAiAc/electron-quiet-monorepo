import type { Options } from 'tsup'
import type { ConfigEnv, UserTsupConfig, UserTsupConfigFn } from '../typings/electronup'
import { getConfig } from './getConfig'
import { getDevelopment, getProduction } from './getEnv'

export const callViteOptions = (userConfig: UserTsupConfig, configEnv: ConfigEnv) => {
  const type = typeof userConfig
  if (type === 'function') {
    const options: Options | Options[] = (userConfig as UserTsupConfigFn)(configEnv)
    return options
  }
  return userConfig as Options | Options[]
}

export const callTsupOptions = (userConfig: UserTsupConfig, configEnv: ConfigEnv) => {
  const type = typeof userConfig
  if (type === 'function') {
    const options: Options | Options[] = (userConfig as UserTsupConfigFn)(configEnv)
    return options
  }
  return userConfig as Options | Options[]
}
export const callBuildOptions = (userConfig: UserTsupConfig, configEnv: ConfigEnv) => {
  const type = typeof userConfig
  if (type === 'function') {
    const options: Options | Options[] = (userConfig as UserTsupConfigFn)(configEnv)
    return options
  }
  return userConfig as Options | Options[]
}
