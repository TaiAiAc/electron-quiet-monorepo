import { resolve } from 'path'
import { buildConfig, defineConfig, tsupConfig, viteConfig } from '@quiteer/electronup'
import type { ConfigEnv } from '@quiteer/electronup'

const viteOptions = viteConfig((env: ConfigEnv) => {
  console.log('env: ', env)
  return {
    root: resolve('./src', 'render')
  }
})

const tsupOptions = tsupConfig((env: ConfigEnv) => {
  console.log('env: ', env)
  return {
  }
})

const builderOptions = buildConfig((env: ConfigEnv) => {
  console.log('env: ', env)
  return {
  }
})

export default defineConfig({
  viteConfig: viteOptions,
  tsupConfig: tsupOptions,
  builderConfig: builderOptions
})
