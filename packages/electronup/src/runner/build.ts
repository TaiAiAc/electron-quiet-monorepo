import { resolve } from 'path'
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

  console.log('initConfig.viteConfig: ', initConfig.viteConfig)
  await tsBuild(initConfig.tsup)
  await viteBuild(initConfig.vite)

  console.log('initConfig.outDir ', initConfig.outDir)
  console.log('initConfig.resourceDir ', initConfig.resourceDir)
  sync(resolve(store.root, initConfig.resourceDir || store.resourceDir))
  sync(resolve(store.root, initConfig.outDir || store.outDir))

  console.log('initConfig.builderConfig: ', initConfig.builderConfig)
  if (initConfig.builderConfig)
    builder(initConfig.builder)
}
