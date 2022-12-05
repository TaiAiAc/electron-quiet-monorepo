import { resolve } from 'path'
import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ElectronupConfig, ViteConfig } from '../typings/electronup'
import { DefaultDirs, store, user } from '../utils'

export function getViteConfig(config: ViteConfig, allConfig: ElectronupConfig) {
  const { mode } = store

  const defaultConfig: UserConfig = {
    base: config.base || './',
    mode,
    root: allConfig.renderDir || DefaultDirs.renderDir,
    publicDir: resolve(store.root, allConfig.publicDir || DefaultDirs.publicDir),
    server: { host: '0.0.0.0' },
    plugins: [vue(), ...(config.plugins ? config.plugins : [])],
    build: {
      outDir: resolve(store.root, allConfig.resourceDir || DefaultDirs.resourceDir),
      target: 'esnext',
      minify: user.minify && 'esbuild',
      reportCompressedSize: false,
      emptyOutDir: true
    },
    ...config.viteOptions
  }

  config.resolve && (defaultConfig.resolve = config.resolve)

  return defaultConfig
}

