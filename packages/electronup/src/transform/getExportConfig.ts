import type { ElectronupConfig, ElectronupConfigFn, UserElectronupConfig } from '../typings/electronup'
import { getElectronupConfig } from '../default/electronup.config'
import { store } from '../utils'

const exportElectronupConfig = (config: UserElectronupConfig): ElectronupConfig => {
  const typeStr = typeof config
  if (typeStr === 'function') {
    const option = (<ElectronupConfigFn>config)({ command: store.command })
    return option
  }

  if (typeStr === 'object')
    return <ElectronupConfig>config

  throw new Error('electronup 配置错误')
}

export const electronupConfig = (config: UserElectronupConfig) => getElectronupConfig(exportElectronupConfig(config))
