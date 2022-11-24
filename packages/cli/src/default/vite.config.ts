import { resolve } from 'path'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ViteConfig } from '../typings/electronup'

const root = process.cwd()

export function getViteConfig(config: ViteConfig) {
  const defaultConfig: UserConfig = {
    base: config.base || './',
    root: config.root || 'render',
    server: {
      host: '0.0.0.0'
    },
    build: {
      outDir: resolve(root, config.outDir || 'dist'),
      target: 'esnext',
      minify: 'esbuild',
      reportCompressedSize: false,
      emptyOutDir: false,
      chunkSizeWarningLimit: 2000
    },
    publicDir: resolve(root, config.publicDir || 'public'),
    plugins: [vue()],
    ...config.viteOptions
  }

  config.resolve && (defaultConfig.resolve = config.resolve)

  return defaultConfig
}

