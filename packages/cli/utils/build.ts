import { $ } from 'zx'

interface BuilderConfigPath {
  vite: string
  tsup: string
  builder: string
}

export function build(options: BuilderConfigPath) {
  console.log('options: ', options)
}
