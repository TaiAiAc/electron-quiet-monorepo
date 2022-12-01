import { Arch, Platform, build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'
import { sync } from 'rimraf'

import inquirer from 'inquirer'
import type { ElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'
import { DefaultDirs, user } from '../utils'

export async function build(options: ElectronupConfig, isOption: boolean) {
  const initConfig = await electronupConfig(options)
  console.info('initConfig: ', initConfig)

  if (isOption) {
    const { isMinify } = await inquirer
      .prompt([{ type: 'confirm', name: 'isMinify', message: '是否压缩代码?' }])
      .catch((err) => {
        console.error('err: ', err)
        process.exit(1)
      })
    user.setMinify(isMinify)

    const { isAsar } = await inquirer
      .prompt([{ type: 'confirm', name: 'isAsar', message: '是否开启asar?' }])
      .catch((err) => {
        console.error('err: ', err)
        process.exit(1)
      })

    const { isInstall } = await inquirer
      .prompt([{ type: 'confirm', name: 'isInstall', message: '是否生成安装包?' }])
      .catch((err) => {
        console.error('err: ', err)
        process.exit(1)
      })

    user.setAsar(isAsar)

    const platform = process.platform
    const arch = process.arch

    const isWin = platform === 'win32'
    const isMac = platform === 'darwin'
    const isLiunx = platform === 'linux'

    if (isWin) {
      if (arch === 'ia32')
        initConfig.builder!.ia32 = true

      if (arch === 'x64') {
        const { pattern } = await inquirer
          .prompt([
            {
              type: 'checkbox',
              name: 'pattern',
              message: '请选择构建模式 , 跳过选择为当前操作系统平台 ~',
              pageSize: 10,
              choices: [
                { name: 'win-x64', value: 'x64' },
                { name: 'win-ia32', value: 'ia32' }
              ]
            }
          ])
          .catch((err) => {
            console.error('err: ', err)
            process.exit(1)
          })

        if (pattern.length) {
          pattern.forEach((arch: 'x64' | 'ia32') => {
            initConfig.builder![arch] = true
          })
        }
      }
      initConfig.builder!.dir = !isInstall
    }

    if (isMac) {
      const { outPlatform } = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'outPlatform',
            message: '请选择构建平台 , 跳过选择为当前操作系统平台 ~',
            pageSize: 10,
            choices: [
              { name: 'win', value: 'win' },
              { name: 'mac', value: 'mac' },
              { name: 'linux', value: 'linux' }
            ]
          }
        ])
        .catch((err) => {
          console.error('err: ', err)
          process.exit(1)
        })

      if (outPlatform === 'mac') {
        initConfig.builder!.arm64 = true
        initConfig.builder!.dir = !isInstall
      }

      if (outPlatform === 'win') {
        const { pattern } = await inquirer
          .prompt([
            {
              type: 'checkbox',
              name: 'pattern',
              message: '请选择构建模式 , 跳过选择为当前操作系统平台 ~',
              pageSize: 10,
              choices: [
                { name: 'win-x64', value: Arch.x64 },
                { name: 'win-ia32', value: Arch.ia32 }
              ]
            }
          ])
          .catch((err) => {
            console.error('err: ', err)
            process.exit(1)
          })

        const archList = []
        pattern.length ? archList.push(...pattern) : archList.push(Arch.x64)
        initConfig.builder!.targets = Platform.WINDOWS.createTarget(!isInstall ? 'dir' : null, ...archList)
      }

      if (outPlatform === 'linux')
        initConfig.builder!.targets = Platform.LINUX.createTarget(!isInstall ? 'dir' : null, Arch.armv7l)
    }

    if (isLiunx) {
      //
    }
  }

  await viteBuild(initConfig.vite)
  await tsBuild(initConfig.tsup)

  sync(initConfig.outDir || DefaultDirs.outDir)

  console.log('initConfig.builder :>> ', initConfig.builder)

  await builder(initConfig.builder)
}
