import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'electronup',
  entry: ['index.ts'],
  outDir: 'bin',
  splitting: false,
  clean: true,
  onSuccess() {
    return new Promise((resolve) => {
      console.log('本次结束')
      resolve()
    })
  },
  external: ['electron']
})
