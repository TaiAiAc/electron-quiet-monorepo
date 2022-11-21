import { $ } from 'zx'
import { getPortPromise } from 'portfinder'

interface WatchConfigPath {
  vite: string
  tsup: string
}

export async function watch(configPath: WatchConfigPath, port: number) {
  console.log('configPath: ', configPath)
  const p = await getPortPromise({
    port: Number(port)
  })

  console.log('p :>> ', p)

  // 得到path
  // 获取导出的option
  // 结合
  // $`vite --config ${configPath.vite}  --port ${p}`
}
