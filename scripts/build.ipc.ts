import { path } from 'zx'
import { copy } from 'fs-extra'
import type { OutputOptions } from 'rollup'
import { rollup } from 'rollup'
import rollupConfig from './rollup.config'

const paths = () => {
  const rootPath = path.resolve(process.cwd(), 'packages/ipc')
  const main = path.resolve(rootPath, 'index.ts')
  const enums = path.resolve(rootPath, 'enums/index.ts')

  const outMain = {
    cjs: path.resolve(rootPath, 'dist/index.cjs'),
    mjs: path.resolve(rootPath, 'dist/index.mjs')
  }
  const outEnums = {
    cjs: path.resolve(rootPath, 'dist/enums.cjs'),
    mjs: path.resolve(rootPath, 'dist/enums.mjs')
  }
  return { rootPath, main, outMain, enums, outEnums }
}

const copyAbout = (rootPath: string) => {
  const copyList = ['package.json', 'README.md', 'LICENSE']

  copyList.forEach((filename) => {
    const file = path.resolve(rootPath, filename)
    const fileCopy = path.resolve(rootPath, 'dist', path.basename(file))
    copy(file, fileCopy)
  })
}

const build = async (input: string, outFile: { cjs: string; mjs: string }) => {
  const output: OutputOptions[] = [
    { file: outFile.cjs, format: 'cjs' },
    { file: outFile.mjs, format: 'esm' }
  ]
  const config = rollupConfig(input, output)
  const rollupBuild = await rollup(config)
  output.forEach((item) => {
    rollupBuild.write(item)
  })
}

async function run() {
  const { rootPath, main, outMain, enums, outEnums } = paths()

  await build(main, outMain)
  await build(enums, outEnums)
  copyAbout(rootPath)
}

run()
