import type { Options } from 'tsup'
import { defineConfig } from 'tsup'

const config: Options = {
  splitting: false,
  clean: true,
  external: ['electron']
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
    outDir: 'bin',
    entry: ['src/cli/electronup.ts']
  }
])
