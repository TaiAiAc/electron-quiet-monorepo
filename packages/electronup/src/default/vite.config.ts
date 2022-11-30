import { resolve } from 'path'
import type { UserConfig } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ElectronupConfig, ViteConfig } from '../typings/electronup'
import { DefaultDirs, store } from '../utils'

export function getViteConfig(config: ViteConfig, allConfig: ElectronupConfig) {
  const { command, mode, root } = store
  console.log('mode: ', mode)

  const env = loadEnv(mode, root, 'VITE_')
  console.log('env: ', env)

  const defaultConfig: UserConfig = {
    base: config.base || './',
    mode,
    root: allConfig.renderDir || DefaultDirs.renderDir,
    publicDir: resolve(store.root, allConfig.publicDir || DefaultDirs.publicDir),
    server: { host: '0.0.0.0' },
    plugins: [command === 'serve' ? vue() : undefined, ...(config.plugins ? config.plugins : [])],
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

