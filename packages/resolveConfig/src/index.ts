import { dirname, extname, join, resolve } from 'path'
import { pathToFileURL } from 'url'
import { parse } from 'yaml'
import { pathExists, readFile, readJson } from 'fs-extra'

const dynamicImport = (file: string) => import(file)

type FileType = '.js' | '.mjs' | '.cjs' | '.ts' | '.json' | '.yaml'

const fileType = new Map<FileType, (filePath: string) => Promise<any>>()

fileType.set('.js', (filePath) => {
  return new Promise((resolve) => {
    resolve(filePath)
  })
})

fileType.set('.mjs', (filePath) => {
  return new Promise((resolve) => {
    const fileUrl = pathToFileURL(filePath)
    dynamicImport(fileUrl.href).then(config => config?.default).then(resolve)
  })
})

fileType.set('.cjs', (filePath) => {
  return new Promise((resolve) => {
    resolve(filePath)
  })
})

fileType.set('.ts', (filePath) => {
  return new Promise((resolve) => {
    resolve(filePath)
  })
})

fileType.set('.json', (filePath) => {
  return new Promise((resolve) => {
    readJson(filePath).then(resolve)
  })
})

fileType.set('.yaml', (filePath) => {
  return new Promise((resolve) => {
    readFile(filePath, 'utf8').then(text => parse(text)).then(resolve)
  })
})

/**
 * 描述
 * @date 2022-12-13
 * @param {any} configPath:string  需要读取配置的路径
 * @param {any} configName?:string  默认文件名
 * @returns {any}
 */
export async function resolveConfig(configPath = process.cwd(), configName = 'config') {
  !configPath || (configPath = process.cwd())

  let suffix = extname(configPath) as FileType

  if (!suffix && !configName)
    throw new Error('检测不到可以解析的配置文件！')

  if (configName) {
    suffix.includes('.') && (configPath = dirname(configPath))

    const configList = ['ts', 'mjs', 'js', 'cjs', 'json', 'yaml'].map(suffix => `${join(configPath, configName)}.${suffix}`)

    const index = (await Promise.all(configList.map(pathExists))).findIndex(flag => flag)
    if (index < 0)
      throw new Error('检测不到可以解析的配置文件！')

    suffix = extname(configList[index]) as FileType

    configPath = resolve(configPath, `${configName}${suffix}`)
  }

  if (!fileType.has(suffix))
    throw new Error('检测不到可以解析的配置文件！')

  return fileType.get(suffix)!(configPath)
}

