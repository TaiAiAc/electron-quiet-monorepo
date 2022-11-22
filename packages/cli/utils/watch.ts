import { getPortPromise } from 'portfinder'
import { createServer } from 'vite'
import { build } from 'tsup'
import { startElectron } from './startElectron'

export async function watch(options: ElectronupConfig, port: number) {
  console.log('options: ', options)
  const p = await getPortPromise({
    port: Number(port)
  })

  console.log('p :>> ', p)
  await createServer(options.viteConfig)
  await build({
    ...options.tsupConfig,
    watch: false,
    dts: false,
    async onSuccess() {
      return startElectron()
    }
  })
}

