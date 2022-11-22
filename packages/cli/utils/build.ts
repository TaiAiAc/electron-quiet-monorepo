import { build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'

export async function build(options: ElectronupConfig) {
  console.log('options: ', options)

  console.log(__dirname)

  await viteBuild(options.viteConfig)
  await tsBuild({
    ...options.tsupConfig,
    watch: false,
    dts: false
  })
  builder(options.builderConfig)
}
