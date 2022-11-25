import { build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'
import type { ElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'

export async function build(options: ElectronupConfig, isOption: boolean) {
  console.info('options: ', options)
  console.info('isOption: ', isOption)

  const initConfig = await electronupConfig(options)

  await viteBuild(initConfig.viteConfig)
  tsBuild(initConfig.tsupConfig)
}
