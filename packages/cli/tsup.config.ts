import { defineConfig } from 'tsup'

const config = {
  splitting: false,
  clean: true,
  external: ['electron', 'electron-builder', 'vite', '@swc/core']
}

export default defineConfig([
  {
    ...config,
    name: 'electronup-api',
    entry: ['src/index.ts'],
    dts: true
  },
  {
    ...config,
    name: 'electronup-cli',
    entry: { cli: 'src/cli/index.ts' }
  }
])
