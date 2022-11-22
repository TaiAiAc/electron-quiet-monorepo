import { defineConfig } from 'tsup'
import type { Options } from 'tsup'

export const tsupConfig = (config: Options) => {
  return defineConfig(config)
}
