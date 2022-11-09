import { defineConfig } from 'tsup'
import { name, version } from './package.json'

const define = {
  PACKAGE_NAME: JSON.stringify(name),
  PACKAGE_VERSION: JSON.stringify(version)
}

const env = {
  Test: '这是我的环境变量'
}

export default defineConfig({
  name: '@quiteer/electron-ipc',
  entry: { enums: 'enums/index.ts', index: 'index.ts' },
  dts: true,
  splitting: false,
  clean: true,
  watch: true,
  env,
  define,
  external: ['electron'],
  format: ['esm', 'cjs']
})
