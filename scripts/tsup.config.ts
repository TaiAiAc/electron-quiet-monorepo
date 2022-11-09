import { defineConfig } from 'tsup'

export const ipc = defineConfig({
  name: '@quiteer/electron-ipc',
  entry: { enums: 'enums/index.ts', index: 'index.ts' },
  dts: true,
  splitting: false,
  clean: true,
  watch: true,
  external: ['electron'],
  format: ['esm', 'cjs']
})
