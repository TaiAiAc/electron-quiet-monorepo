#!/usr/bin/env node
import { cac } from 'cac'
import { build, watch } from './runner'
import { getConfig } from './transform'
import { version } from './../package.json'
import { store } from './utils'

interface Options {
  c?: string
  config?: string
  m?: string
  mode?: string
}

interface DevOptions extends Options {
  p?: number
  port?: number
}

interface BuildOptions extends Options {
  o?: boolean
  option?: boolean
}

const cli = cac('electronup')

cli.option('-c , --config <file>', '[string] 构建配置 ')
cli.option('-m , --mode <mode>', '[development | production | test | staging | ...] 环境模式 ')

cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .option('-p , --port <port>', '[number] 渲染进程的端口号 ，如果占用会切换非占用的端口 ')
  .action(async (dir: undefined | string, options: DevOptions) => {
    const { config, mode, port } = options

    const option = await getConfig(config)

    store.setCommand('serve')
    store.setMode(mode || 'development')
    watch(option, port || 8090)
  })

cli
  .command('build [root]', '构建')
  .option('-o , --option', '自定义 , 自定义构建选项 ')
  .action(async (dir: undefined | string, options: BuildOptions) => {
    const { config, mode, option = false } = options

    const configOption = await getConfig(config)

    store.setCommand('build')
    store.setMode(mode || 'production')
    build(configOption, option)
  })

cli.help()
cli.version(version)
cli.parse()
