#!/usr/bin/env node
import { cac } from 'cac'
import { watch } from '../watch'
import { build } from '../build'
import { getConfig, transform } from '../transform'
import { version } from '../../package.json'

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

cli.option('-c , --config <file>', '[string] 构建配置 ')

cli
  .command('[root]', 'start dev server') // default command
  .alias('dev')
  .option('--port <port>', '[number] 渲染进程的端口号 ，如果占用会切换非占用的端口 ')
  .action(async (dir: undefined | string, options: DevOptions) => {
    const { port = 8090, c, config } = options

    const option = await getConfig(c || config)

    watch(option, port)
  })

cli
  .command('build [root]', '构建')
  .option('-o , --option', '自定义 , 自定义构建选项 ')
  .option('-rm', '清理 , 是否清理构建目录 ')
  .action(async (dir: undefined | string, options: BuildOptions) => {
    const { c, config, o = false, option = false } = options
    console.log('o, option: ', o, option)

    const configOption = await getConfig(c || config)
    build(configOption, o || option)
  })

cli.help()
cli.version(version)
cli.parse()
