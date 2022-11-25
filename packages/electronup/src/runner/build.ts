import { build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'
import type { ElectronupConfig } from '../typings/electronup'

export async function build(options: ElectronupConfig, isOption: boolean) {
  console.info('options: ', options)
  console.info('isOption: ', isOption)

  builder(options.builderConfig)
}
