import { getPortPromise } from 'portfinder'
import { createServer } from 'vite'
import { build } from 'tsup'
import type { ElectronupConfig } from '../typings/electronup'
import { startElectron } from './startElectron'

export async function watch(options: ElectronupConfig, port: number) {
  const p = await getPortPromise({
    port: Number(port)
  })
  console.log('p :>> ', p)

  // await createServer(options.viteConfig)
  // await build({
  //   ...options.tsupConfig,
  //   watch: false,
  //   dts: false,
  //   async onSuccess() {
  //     return startElectron()
  //   }
  // })
}

