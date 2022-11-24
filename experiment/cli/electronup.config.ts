import type { ConfigEnv } from '@quiteer/electronup'
import { builderConfig, defineConfig } from '@quiteer/electronup'

const builderOptions = builderConfig((env: ConfigEnv) => {
  console.log('builderConfig env: ', env)
  return { }
})

export default defineConfig({
  builderConfig: builderOptions
})
