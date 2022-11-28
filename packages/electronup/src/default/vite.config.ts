import { resolve } from 'path'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ElectronupConfig, ViteConfig } from '../typings/electronup'
import { store } from '../utils'

export function getViteConfig(config: ViteConfig, allConfig: ElectronupConfig) {
  const { renderDir, resourceDir, publicDir, command } = store

  const defaultConfig: UserConfig = {
    base: config.base || './',
    root: allConfig.renderDir || renderDir,
    publicDir: resolve(store.root, allConfig.publicDir || publicDir),
    server: { host: '0.0.0.0' },
    plugins: [command === 'serve' ? vue() : undefined, ...(config.plugins ? config.plugins : [])],
    ...config.viteOptions,
    build: {
      outDir: resolve(store.root, allConfig.resourceDir || resourceDir),
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

