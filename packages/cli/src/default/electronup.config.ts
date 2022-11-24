import type{ ElectronupConfig } from '../typings/electronup'

export function getElectronupConfig(config: ElectronupConfig) {
  const defaultConfig: ElectronupConfig = {
    ...config
  }

  return defaultConfig
}
