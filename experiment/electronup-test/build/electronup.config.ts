import type { ConfigEnv, ElectronupConfig } from '@quiteer/electronup'
import { defineConfig } from '@quiteer/electronup'
import builderConfig from './builder.config'
import tsupConfig from './tsup.config'
import viteConfig from './vite.config'

/**
 * 框架内置的配置
 * 无需重复配置
 * 在此列出
 */
const defaultConfig: Omit<ElectronupConfig, 'builderConfig'> = {
  renderDir: 'render',
  mainDir: 'main',
  publicDir: 'public',
  libDir: 'lib',
  resourceDir: 'dist',
  outDir: 'out'
}

export default defineConfig((env: ConfigEnv) => {
  console.log('defineConfig env: ', env)
  return {
    ...defaultConfig,
    builderConfig,
    tsupConfig,
    viteConfig
  }
})
