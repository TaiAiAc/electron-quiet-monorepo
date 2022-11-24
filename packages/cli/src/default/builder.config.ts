import type { BuilderConfig } from '../typings/builder'

export function getBuilderConfig(config: BuilderConfig) {
  const defaultConfig: BuilderConfig = {
    ...config
  }

  return defaultConfig
}

