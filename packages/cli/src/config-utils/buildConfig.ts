import type { UserBuildConfig } from '../typings/electronup'

export const buildConfig = (configFn: UserBuildConfig): UserBuildConfig => {
  if (typeof configFn === 'function')
    return env => configFn(env)

  if (typeof configFn === 'object')
    return configFn

  throw new Error('请完善配置')
}

