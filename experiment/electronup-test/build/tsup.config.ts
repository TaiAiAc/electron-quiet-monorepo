import type { TsupConfig } from '@quiteer/electronup'

export default {
  minify: false,
  external: [
    'electron'
    // ... 自行追加忽略文件
  ],
  entry: { electron: 'main/index.ts' },
  outDir: 'dist',
  // watch: command === 'serve' dev环境下监听文件改变,
  dts: false,
  clean: false
  // env: injectEnv() 自动注入 .env 文件内的环境变量
} as TsupConfig
