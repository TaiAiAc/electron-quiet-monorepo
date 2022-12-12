import { resolve } from 'path'
import { pathToFileURL } from 'url'
// esm模块
// 获取文件路径
// 转换file协议的路径

const dynamicImport = (file: string) => import(file)

const configPath = resolve(process.cwd(), 'config.mjs')

const fileUrl = pathToFileURL(configPath)

dynamicImport(fileUrl.href).then((config) => {
  console.log('config :>> ', config?.default.info)
})
