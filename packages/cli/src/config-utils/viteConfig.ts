import type { UserViteConfig } from '../typings/electronup'

export const viteConfig = (userConfigExport: UserViteConfig): UserViteConfig => {
  if (typeof userConfigExport === 'function')
    return env => userConfigExport(env)

  if (typeof userConfigExport === 'object')
    return userConfigExport

  throw new Error('请完善配置')
}
