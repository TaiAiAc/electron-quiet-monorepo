import type { UserTsupConfig } from '../typings/electronup'

export const tsupConfig = (userTsupConfig: UserTsupConfig): UserTsupConfig => {
  if (typeof userTsupConfig === 'function')
    return env => userTsupConfig(env)

  if (typeof userTsupConfig === 'object')
    return userTsupConfig

  throw new Error('请完善配置')
}
