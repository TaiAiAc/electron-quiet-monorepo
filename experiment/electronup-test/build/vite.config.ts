import type { ViteConfig } from '@quiteer/electronup'

export default {
  base: './',
  root: 'render',
  publicDir: 'public',
  server: { host: '0.0.0.0' },
  plugins: [
    // vue()
    // 自行导入插件
  ],
  // ...config.viteOptions,
  build: {
    outDir: 'dist',
    target: 'esnext',
    minify: 'esbuild',
    reportCompressedSize: false,
    emptyOutDir: false,
    chunkSizeWarningLimit: 2000
  },
  // 额外的vite配置
  viteOptions: {}
} as ViteConfig
