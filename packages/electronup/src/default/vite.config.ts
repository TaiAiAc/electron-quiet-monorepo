import { resolve } from 'path'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ElectronupConfig, ViteConfig } from '../typings/electronup'
import { DefaultDirs, store } from '../utils'

export function getViteConfig(config: ViteConfig, allConfig: ElectronupConfig) {
  const { mode } = store

  const defaultConfig: UserConfig = {
    base: config.base || './',
    mode,
    root: allConfig.renderDir || DefaultDirs.renderDir,
    publicDir: resolve(store.root, allConfig.publicDir || DefaultDirs.publicDir),
    server: { host: '0.0.0.0' },
    // plugins: [command === 'serve' ? vue() : undefined, ...(config.plugins ? config.plugins : [])],
    plugins: [vue(), ...(config.plugins ? config.plugins : [])],
    ...config.viteOptions,
    build: {
      outDir: resolve(store.root, allConfig.resourceDir || DefaultDirs.resourceDir),
      target: 'esnext',
      minify: 'esbuild',
      reportCompressedSize: false,
      emptyOutDir: false,
      chunkSizeWarningLimit: 2000
    }
  }

  config.resolve && (defaultConfig.resolve = config.resolve)

  return defaultConfig
}

