import type { UserElectronupConfig } from '../typings/electronup'

export const defineConfig = (electronupConfig: UserElectronupConfig): UserElectronupConfig => {
  if (typeof electronupConfig === 'function')
    return env => electronupConfig(env)

  if (typeof electronupConfig === 'object')
    return electronupConfig

  throw new Error('请完善配置')
}
