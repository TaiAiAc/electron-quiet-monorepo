import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'electron-preload',
  entry: ['index.ts'],
  outDir: 'bin',
  dts: false,
  splitting: false,
  clean: true,
  external: ['electron']
})
