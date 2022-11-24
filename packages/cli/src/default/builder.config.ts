import type { BuilderConfig } from '../typings/electronup'

export function getBuilderConfig(config: BuilderConfig) {
  const defaultConfig: BuilderConfig = {
    ...config
  }

  return defaultConfig
}

