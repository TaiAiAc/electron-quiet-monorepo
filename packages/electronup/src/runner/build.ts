import { Platform, build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'
import { sync } from 'rimraf'

import type { ElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'
import { DefaultDirs, user } from '../utils'
import { getInquirer } from './inquirer'

export async function build(options: ElectronupConfig, isOption: boolean) {
  console.info('isOption: ', isOption)

  if (isOption) {
    await getInquirer()
    user.setIsCustom(isOption)
  }

  const initConfig = await electronupConfig(options)
  console.info('initConfig: ', initConfig)
  await viteBuild(initConfig.vite)
  await tsBuild(initConfig.tsup)

  sync(initConfig.outDir || DefaultDirs.outDir)

  if (user.pattern.size === 1) {
    console.log('user.dir: ', user.dir)
    user.pattern.forEach((value, key) => {
      const targetsP = {
        win: Platform.WINDOWS.createTarget(user.dir ? 'dir' : null, ...value)
      }
      console.log('targetsP: ', targetsP)
      builder({
        ...initConfig.builder,
        targets: targetsP[key]
      })
    })
  }
}
