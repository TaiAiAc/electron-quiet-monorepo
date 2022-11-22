import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'electronup',
  entry: { cli: 'index.ts' },
  splitting: false,
  clean: true,
  external: ['electron', 'electron-builder', 'vite', '@swc/core']
})
