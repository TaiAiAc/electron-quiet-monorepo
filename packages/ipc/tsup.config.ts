import { defineConfig } from 'tsup'

export default defineConfig(({ watch }) => {
  return [{
    name: 'electron-ipc',
    entry: ['index.ts'],
    dts: true,
    splitting: false,
    clean: true,
    minify: !watch,
    format: ['esm', 'cjs'],
    external: ['electron']
  }]
})
