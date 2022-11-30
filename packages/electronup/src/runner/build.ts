import { build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'
import { sync } from 'rimraf'
import type { ElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'
import { DefaultDirs } from '../utils'

export async function build(options: ElectronupConfig, isOption: boolean) {
  console.info('isOption: ', isOption)

  const initConfig = await electronupConfig(options)

  sync(initConfig.resourceDir || DefaultDirs.resourceDir)
  await viteBuild(initConfig.vite)
  await tsBuild(initConfig.tsup)

  sync(initConfig.outDir || DefaultDirs.outDir)
  builder(initConfig.builder)
}
