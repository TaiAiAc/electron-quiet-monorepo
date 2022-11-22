import { defineConfig } from 'tsup'
import { devDependencies } from './package.json'
console.log('devDependencies: ')

const config = {
  splitting: false,
  clean: true,
  external: ['electron', ...Object.keys(devDependencies)]
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
    entry: ['src/cli/index.ts']
  }
])
