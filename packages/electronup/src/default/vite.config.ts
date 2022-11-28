import { resolve } from 'path'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ElectronupConfig, ViteConfig } from '../typings/electronup'
import { store } from '../utils'

export function getViteConfig(config: ViteConfig, allConfig: ElectronupConfig) {
  const { renderDir, resourceDir, publicDir } = store

  const defaultConfig: UserConfig = {
    base: config.base || './',
    root: allConfig.renderDir || config.root || renderDir,
    server: {
      host: '0.0.0.0'
    },
    build: {
      outDir: resolve(store.root, allConfig.resourceDir || config.outDir || resourceDir),
      target: 'esnext',
      minify: 'esbuild',
      reportCompressedSize: false,
      emptyOutDir: false,
      chunkSizeWarningLimit: 2000
    },
    publicDir: resolve(store.root, allConfig.publicDir || config.publicDir || publicDir),
    plugins: [vue(), ...(config.plugins ? config.plugins : [])],
    ...config.viteOptions
  }

  config.resolve && (defaultConfig.resolve = config.resolve)

  return defaultConfig
}

