import inquirer from 'inquirer'
import { user } from '../utils'

export async function getInquirer() {
  const { isMinify } = await inquirer
    .prompt([{ type: 'confirm', name: 'isMinify', message: '是否压缩代码?' }])
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

  const platform = process.platform
  const arch = process.arch

  const isWin = platform === 'win32'
  const isMac = platform === 'darwin'
  const isLiunx = platform === 'linux'
  const isIa32 = arch === 'ia32'

  const { pattern } = await inquirer
    .prompt([
      {
        type: 'checkbox',
        name: 'pattern',
        message: '请选择构建模式 , 跳过选择为当前操作系统平台 ~',
        pageSize: 10,
        choices: [
          { name: 'win-x64', value: 'win-x64', disabled: isIa32 || isLiunx },
          { name: 'win-ia32', value: 'win-ia32', disabled: !isWin },
          { name: 'mac-x64', value: 'mac-x64', disabled: !isMac },
          { name: 'mac-arm64', value: 'mac-arm64', disabled: !isMac },
          { name: 'mac-universal', value: 'mac-universal', disabled: !isMac },
          {
            name: 'linux-armv7l',
            value: 'linux-armv7l',
            disabled: !(isLiunx || isMac)
          },
          {
            name: 'linux-arm64',
            value: 'linux-arm64',
            disabled: !(isLiunx || isMac)
          },
          {
            name: 'linux-x64',
            value: 'linux-x64',
            disabled: !(isLiunx || isMac)
          }
        ]
      }
    ])
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

  user.setMinify(isMinify)
  user.setAsar(isAsar)
  user.setPattern(pattern)
  user.setDir(!isInstall)
}
