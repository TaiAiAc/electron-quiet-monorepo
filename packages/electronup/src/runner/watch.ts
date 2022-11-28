import { getPortPromise } from 'portfinder'
import { createServer } from 'vite'
import { build } from 'tsup'
import type { UserElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'
import { store } from '../utils'

export async function watch(options: UserElectronupConfig, port: number) {
  const p = await getPortPromise({
    port: Number(port)
  })
  store.setPort(p)

  const initConfig = await electronupConfig(options)

  const viteDevServer = await createServer({ configFile: false, ...initConfig.vite })

  viteDevServer.listen(p).then(viteDevServer.printUrls)

  build(initConfig.tsup)
}

