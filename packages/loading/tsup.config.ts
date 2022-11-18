import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'electron-preload',
  entry: ['src/index.ts'],
  dts: true,
  splitting: false,
  clean: true,
  external: ['electron'],
  format: ['esm', 'cjs']
})
