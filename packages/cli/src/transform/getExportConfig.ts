import type { ElectronupConfig, ElectronupConfigFn, UserElectronupConfig } from '../typings/electronup'
import type { ConfigEnv } from '../typings/env'
import { getElectronupConfig } from '../default/index'

const exportElectronupConfig = (config: UserElectronupConfig, env: ConfigEnv): ElectronupConfig => {
  const typeStr = typeof config
  if (typeStr === 'function') {
    const option = (<ElectronupConfigFn>config)(env)
    return option
  }

  if (typeStr === 'object')
    return <ElectronupConfig>config

  throw new Error('electronup 配置错误')
}

export const electronupConfig = (config: UserElectronupConfig, env: ConfigEnv) => getElectronupConfig(exportElectronupConfig(config, env))
