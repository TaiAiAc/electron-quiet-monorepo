import { defineConfig } from '@quiteer/electronup'
import { builderOptions } from './builder.config'
import viteConfig from './vite.config'
import tsupConfig from './tsup.config'

export default defineConfig({
  builderConfig: builderOptions,
  viteConfig,
  tsupConfig
})

