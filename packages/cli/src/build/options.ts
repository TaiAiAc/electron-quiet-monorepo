import type { ElectronupConfig } from '../typings/electronup'

export async function optionBuild(options: ElectronupConfig) {
  console.log('options: ', options)

  // await viteBuild(options.viteConfig)
  // await tsBuild({
  //   ...options.tsupConfig,
  //   watch: false,
  //   dts: false
  // })
  // builder(options.builderConfig)
}
