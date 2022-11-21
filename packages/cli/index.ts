#!/usr/bin/env node

import { cac } from 'cac'
import { version } from './package.json'
import { watch } from './utils/watch'
import { build } from './utils/build'

interface Options {
  vite: string
  tsup: string
}

interface DevOptions extends Options {
  port?: number
}

interface BuildOptions extends Options {
  builder: string
}

const cli = cac('electronup')

cli.option('--vite <file>', '[string] 构建渲染进程的配置文件 ')
  .option('--tsup <file>', '[string] 构建主进程的配置文件 ')

cli
  .command('[root]', 'start dev server , 完成构建须传入 --vite [file] --tsup [file]') // default command
  .alias('dev')
  .option('--port <port>', '[number] 渲染进程的端口号 ，如果占用会切换非占用的端口 ')
  .action((root, options: DevOptions) => {
    console.log('root: ', root)
    const { port = 8090, vite, tsup } = options
    if (!vite)
      throw new Error('缺少 vite 配置文件路径参数,请完善 --vite 传入配置参数！')
    if (!tsup)
      throw new Error('缺少 tsup 配置文件路径参数,请完善 --tsup 传入配置参数！')

    watch({ vite, tsup }, port)
  })

cli
  .command('build [root]', 'build for production , 完成构建须传入 --vite [file] --tsup [file] --builder [file]')
  .option('--builder <file>', '[string] 构建桌面端应用的配置文件 ')
  .action((root, options: BuildOptions) => {
    console.log('root: ', root)
    const { vite, tsup, builder } = options
    if (!vite)
      throw new Error('缺少 vite 配置文件路径参数,请完善 --vite 传入配置参数！')
    if (!tsup)
      throw new Error('缺少 tsup 配置文件路径参数,请完善 --tsup 传入配置参数！')
    if (!builder)
      throw new Error('缺少 electron-builder 配置文件路径参数,请完善 --builder 传入配置参数！')

    build({ vite, tsup, builder })
  })

cli.help()
cli.version(version)

cli.parse()
