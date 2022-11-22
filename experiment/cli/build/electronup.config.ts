import { defineConfig } from '@quiteer/electronup'
import builderConfig from './builder.config'
import viteConfig from './vite.config'
import tsupConfig from './tsup.config'

export default defineConfig({
  builderConfig, viteConfig, tsupConfig
})

