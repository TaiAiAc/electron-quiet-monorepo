import { build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'
import type { ElectronupConfig } from '../typings/electronup'
import { tsupConfig, viteConfig } from '../transform'

export async function build(options: ElectronupConfig, isOption: boolean) {
  console.info('options: ', options)
  console.info('isOption: ', isOption)

  const viteOption = viteConfig(options.viteConfig || {}, { command: 'build' })
  const tsupOption = tsupConfig(options.tsupConfig || {}, { command: 'build' })

  await Promise.all([viteBuild(viteOption), tsBuild(tsupOption)])

  builder(options.builderConfig)
}
