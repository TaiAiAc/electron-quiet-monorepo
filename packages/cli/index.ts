#!/usr/bin/env node

import { cac } from 'cac'
import { version } from './package.json'
import { watch } from './utils/watch'
import { build } from './utils/build'
import 'ts-swc-register'

interface Options {
  c?: string
  config?: string
}

interface DevOptions extends Options {
  port?: number
}

interface BuildOptions extends Options {
  o?: boolean
  option?: boolean
}

const cli = cac('electronup')

cli.option('-c --config <file>', '[string] 构建配置 ')

cli
  .command('[root]', 'start dev server , 完成构建须传入 -c | --config [file]') // default command
  .alias('dev')
  .option('--port <port>', '[number] 渲染进程的端口号 ，如果占用会切换非占用的端口 ')
  .action(async (root: undefined | string, options: DevOptions) => {
    console.log('root: ', root)
    const { port = 8090, c, config } = options

    const filePath = c || config
    if (filePath) {
      const option = await import(filePath)
      watch(option, port)
    }
  })

cli
  .command('build [root]', '构建 , 完成构建须传入 -c | --config [file]')
  .option('-o , --option', '自定义 , 自定义构建选项 ')
  .option('-rm , --rimraf', '清理 , 是否清理构建目录 ')
  .action(async (root: undefined | string, options: BuildOptions) => {
    console.log('root: ', root)
    const { c, config, o, option } = options
    console.log('o, option: ', o, option)

    const filePath = c || config
    if (filePath) {
      const option = await import(filePath)
      build(option)
    }
  })

cli.help()
cli.version(version)

cli.parse()
