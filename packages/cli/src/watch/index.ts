import { getPortPromise } from 'portfinder'
import { createServer } from 'vite'
import { build } from 'tsup'
import type { ElectronupConfig } from '../typings/electronup'
import { tsupConfig, viteConfig } from '../transform'

export async function watch(options: ElectronupConfig, port: number) {
  const p = await getPortPromise({
    port: Number(port)
  })

  const viteOption = viteConfig(options.viteConfig || {}, { command: 'serve' })
  const viteDevServer = await createServer({ configFile: false, ...viteOption })

  viteDevServer.listen(p).then(viteDevServer.printUrls)

  const tsupOption = tsupConfig(options.tsupConfig || {}, { command: 'serve' })
  build(tsupOption)
}

