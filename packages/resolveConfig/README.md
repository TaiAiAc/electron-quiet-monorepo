# @quiteer/resolve-config


> 用于读取项目下 'ts', 'mjs', 'js', 'cjs', 'json', 'yaml' 的用户配置

## 安装

```bash
npm i @quiteer/resolve-config -D
```
```bash
yarn add @quiteer/resolve-config -D
```
```bash
pnpm add @quiteer/resolve-config -D
```


## 使用

> configPath : 传入具体路径或者路径，指定 ·configName· 参数时可传入undefined
> configName ：可选，传入参数后，无需指定具体参数，穿入目录路径即可，自动匹配不同后缀的配置文件

```ts
import { resolve } from 'path'
import { resolveConfig } from '@quiteer/resolve-config'

const filePath = (path: string) => resolve(resolve(), path)

const cjs = filePath('./test-cjs/config.cjs')
const js = filePath('./test-js/config.js')
const json = filePath('./test-json/config.json')
const mjs = filePath('./test-mjs/config.mjs')
const ts = filePath('./test-ts/config.ts')
const yaml = filePath('./test-yaml/config.yaml')

const test = async () => {
  const yamlConfig = await resolveConfig(yaml)
  console.log('yamlConfig: ', yamlConfig)

  const jsonConfig = await resolveConfig(json)
  console.log('jsonConfig: ', jsonConfig)

  const mjsConfig = await resolveConfig(mjs)
  console.log('mjsConfig: ', mjsConfig)

  const jsConfig = await resolveConfig(js)
  console.log('jsConfig: ', jsConfig)

  const cjsConfig = await resolveConfig(cjs)
  console.log('cjsConfig: ', cjsConfig)

  const tsConfig = await resolveConfig(ts)
  console.log('tsConfig: ', tsConfig)

  const rootConfig = await resolveConfig(undefined, 'config')
  console.log('rootConfig: ', rootConfig)

  const elctornup = await resolveConfig(undefined, 'electronup.config')
  console.log('elctornup: ', JSON.stringify(elctornup))
}
test()
```

## 暴露的api
``` ts
/**
 * 描述
 * @param {any} configPath:string  需要读取配置的路径
 * @param {any} configName?:string  配置文件名
 * @returns {any}
 */
declare function resolveConfig(configPath?: string, configName?: string): Promise<any>

export { resolveConfig }
```

## 配置文件优先级

'ts' > 'mjs' > 'cjs' > 'js' > 'json' > 'yaml'
