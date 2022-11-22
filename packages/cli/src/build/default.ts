import { build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'
import type { ElectronupConfig } from '../typings/electronup'

export async function defaultBuild(options: ElectronupConfig) {
  console.log('options: ', options)

  // await viteBuild(options.viteConfig)
  // await tsBuild({
  //   ...options.tsupConfig,
  //   watch: false,
  //   dts: false
  // })
  // builder(options.builderConfig)
}
