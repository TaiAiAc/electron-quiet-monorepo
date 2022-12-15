import { getPortPromise } from 'portfinder'
import { createServer } from 'vite'
import { build } from 'tsup'
import type { UserElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'
import { store } from '../utils'

export async function watch(options: UserElectronupConfig) {
  const p = await getPortPromise({
    port: Number(store.port)
  })

  const initConfig = await electronupConfig(options)
  console.log('initConfig: ', initConfig)

  const viteDevServer = await createServer({ configFile: false, ...initConfig.vite })

  viteDevServer.listen(p).then(viteDevServer.printUrls)

  build(initConfig.tsup)
}

