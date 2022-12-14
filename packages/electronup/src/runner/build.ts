import { Arch, Platform, build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'

import inquirer from 'inquirer'
import type { ElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'

export async function build(options: ElectronupConfig, isOption: boolean) {
  const initConfig = await electronupConfig(options)

  if (isOption) {
    const { isMinify } = await inquirer
      .prompt([{ type: 'confirm', name: 'isMinify', message: '是否压缩代码?' }])
      .catch((err) => {
        console.error('err: ', err)
        process.exit(1)
      })

    initConfig.tsup.minify = isMinify
    initConfig.vite.build!.minify = isMinify ? 'esbuild' : false

    const { isPackage } = await inquirer
      .prompt([{ type: 'confirm', name: 'isPackage', message: '是否生成安装包?' }])
      .catch((err) => {
        console.error('err: ', err)
        process.exit(1)
      })

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
      initConfig.builder!.dir = !isPackage
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
        const { pattern } = await inquirer
          .prompt([
            {
              type: 'checkbox',
              name: 'pattern',
              message: '请选择构建模式 , 跳过选择为当前操作系统平台 ~',
              pageSize: 10,
              choices: [
                { name: 'mac-x64', value: Arch.x64 },
                { name: 'mac-arm64', value: Arch.arm64 }
              ]
            }
          ])
          .catch((err) => {
            console.error('err: ', err)
            process.exit(1)
          })

        const archList = []
        pattern.length ? archList.push(...pattern) : archList.push(Arch[arch])
        initConfig.builder!.targets = Platform.MAC.createTarget(!isPackage ? 'dir' : null, ...archList)
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
        initConfig.builder!.targets = Platform.WINDOWS.createTarget(!isPackage ? 'dir' : null, ...archList)
      }

      if (outPlatform === 'linux')
        initConfig.builder!.targets = Platform.LINUX.createTarget(!isPackage ? 'dir' : null, Arch.armv7l)
    }

    if (isLiunx) {
      //
    }
  }
  console.info('initConfig: ', initConfig)

  await viteBuild(initConfig.vite)
  await tsBuild(initConfig.tsup)

  await builder(initConfig.builder)
}
