import { getPortPromise } from 'portfinder'
import { createServer } from 'vite'
import { build } from 'tsup'
import type { UserElectronupConfig } from '../typings/electronup'
import { electronupConfig } from '../transform'
import { getTsupConfig, getViteConfig } from '../default'
import { env } from '../utils'

export async function watch(options: UserElectronupConfig, port: number) {
  env.setCommand('serve')

  const p = await getPortPromise({
    port: Number(port)
  })

  const electronupOption = electronupConfig(options)

  const viteOption = getViteConfig(electronupOption.viteConfig || {})
  const viteDevServer = await createServer({ configFile: false, ...viteOption })

  viteDevServer.listen(p).then(viteDevServer.printUrls)

  const tsupOption = getTsupConfig(electronupOption.tsupConfig || {})
  build(tsupOption)
}

