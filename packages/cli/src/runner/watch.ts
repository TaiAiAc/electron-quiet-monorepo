import { getPortPromise } from 'portfinder'
import { createServer } from 'vite'
import { build } from 'tsup'
import type { UserElectronupConfig } from '../typings/electronup'
import { electronupConfig, tsupConfig, viteConfig } from '../transform'

export async function watch(options: UserElectronupConfig, port: number) {
  const p = await getPortPromise({
    port: Number(port)
  })

  const electronupOption = electronupConfig(options, { command: 'serve' })

  const viteOption = viteConfig(electronupOption.viteConfig || {}, { command: 'serve' })
  const viteDevServer = await createServer({ configFile: false, ...viteOption })

  viteDevServer.listen(p).then(viteDevServer.printUrls)

  const tsupOption = tsupConfig(electronupOption.tsupConfig || {}, { command: 'serve' })
  build(tsupOption)
}

