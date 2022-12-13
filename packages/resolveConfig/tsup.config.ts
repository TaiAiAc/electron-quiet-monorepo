import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'resolve-config',
  entry: ['src/index.ts'],
  dts: true,
  splitting: false,
  clean: true,
  format: ['esm', 'cjs'],
  external: []
})
