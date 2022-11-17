import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'electron-ipc',
  entry: { 'event-enum': 'event-enum/index.ts', 'index': 'index.ts' },
  dts: true,
  splitting: false,
  clean: true,
  minify: true,
  format: ['esm', 'cjs'],
  external: ['electron']
})
