import { $, path } from 'zx'
import { copy } from 'fs-extra'

async function run() {
  await $`rollup --config rollup.config.js`

  await $`tsc --emitDeclarationOnly`
  const copyList = ['package.json', 'README.md', 'LICENSE']

  copyList.forEach((filename) => {
    const file = path.resolve('./', filename)
    const fileCopy = path.resolve('./dist', path.basename(file))
    copy(file, fileCopy)
  })
}

run()
