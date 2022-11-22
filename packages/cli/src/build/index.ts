import type { ElectronupConfig } from '../typings/electronup'
export { defaultBuild } from './default'
export { optionBuild } from './options'

export async function build(options: ElectronupConfig, isOption = false) {
  console.log('options: ', options)
  console.log('isOption: ', isOption)

  // await viteBuild(options.viteConfig)
  // await tsBuild({
  //   ...options.tsupConfig,
  //   watch: false,
  //   dts: false
  // })
  // builder(options.builderConfig)
}
