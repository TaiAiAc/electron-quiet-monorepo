import { build as builder } from 'electron-builder'
import { build as viteBuild } from 'vite'
import { build as tsBuild } from 'tsup'
import { sync } from 'rimraf'
import inquirer from 'inquirer'
import type { ElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'
import { DefaultDirs, user } from '../utils'

export async function build(options: ElectronupConfig, isOption: boolean) {
  console.info('isOption: ', isOption)

  if (isOption) {
    const { isMinify } = await inquirer
      .prompt([{ type: 'confirm', name: 'isMinify', message: '是否压缩代码?' }])
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

    const { isAsar } = await inquirer
      .prompt([{ type: 'confirm', name: 'isAsar', message: '是否开启asar?' }])
      .catch((err) => {
        console.error('err: ', err)
        process.exit(1)
      })

    const isMac = process.platform === 'darwin'
    const isLiunx = process.platform === 'linux'
    const isWin32 = process.arch === 'ia32'
    const isWin64 = process.arch === 'x64'

    const { pattern } = await inquirer
      .prompt([
        {
          type: 'checkbox',
          name: 'pattern',
          message: '请选择构建模式 , 默认为当前操作系统平台 ~',
          pageSize: 10,
          choices: [
            { name: 'win-x64', value: 'x64', disabled: !(isWin64 || isMac) },
            { name: 'win-ia32', value: 'ia32', disabled: !(isWin64 || isWin32 || isMac) },
            { name: 'mac-x64', value: 'x64', disabled: !isMac },
            { name: 'mac-arm64', value: 'arm64', disabled: !isMac },
            { name: 'mac-universal', value: 'universal', disabled: !isMac },
            {
              name: 'linux-armv7l',
              value: 'armv7l',
              disabled: !(isLiunx || isMac)
            }
          ]
        }
      ])
      .catch((err) => {
        console.error('err: ', err)
        process.exit(1)
      })

    user.setIsCustom(isOption)
    user.setMinify(isMinify)
    user.setDir(!isInstall)
    user.setAsar(isAsar)
    user.setPattern(pattern)
  }

  const initConfig = await electronupConfig(options)
  console.log('initConfig: ', initConfig)
  await viteBuild(initConfig.vite)
  await tsBuild(initConfig.tsup)

  sync(initConfig.outDir || DefaultDirs.outDir)
  builder(initConfig.builder)
}
