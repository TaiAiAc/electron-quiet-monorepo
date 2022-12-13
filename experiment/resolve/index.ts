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
}
test()
