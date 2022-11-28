import { build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'
import { sync } from 'rimraf'
import type { ElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'
import { store } from '../utils'

export async function build(options: ElectronupConfig, isOption: boolean) {
  console.info('isOption: ', isOption)

  const initConfig = await electronupConfig(options)
  console.warn('initConfig: ', initConfig)

  sync(initConfig.resourceDir || store.resourceDir)
  await viteBuild(initConfig.vite)
  await tsBuild(initConfig.tsup)

  sync(initConfig.outDir || store.outDir)
  builder(initConfig.builder)
}
