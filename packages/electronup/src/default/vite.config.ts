import { resolve } from 'path'
import type { UserConfig } from 'vite'
import type { ElectronupConfig, ViteConfig } from '../typings/electronup'
import { DefaultDirs, store } from '../utils'

export function getViteConfig(config: ViteConfig, allConfig: ElectronupConfig) {
  const { root } = store

  const defaultConfig: UserConfig = {
    base: './',
    root: allConfig.renderDir || DefaultDirs.renderDir,
    server: { host: '0.0.0.0' },
    build: {
      outDir: resolve(root, allConfig.resourceDir || DefaultDirs.resourceDir),
      target: 'esnext',
      minify: 'esbuild',
      reportCompressedSize: false,
      emptyOutDir: true
    },
    ...config.viteOptions
  }

  config?.resolve && (defaultConfig.resolve = config.resolve)
  config?.plugins && (defaultConfig.plugins = config.plugins)
  defaultConfig.publicDir = resolve(root, allConfig.publicDir || DefaultDirs.publicDir)

  return defaultConfig
}

