import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'electron-ipc',
  entry: { enums: 'enums/index.ts', index: 'index.ts' },
  dts: true,
  splitting: false,
  clean: true,
  format: ['esm', 'cjs'],
  external: ['electron']
})
