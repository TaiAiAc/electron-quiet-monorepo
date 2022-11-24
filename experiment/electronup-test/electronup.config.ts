import type { ConfigEnv } from '@quiteer/electronup'
import { builderConfig, defineConfig } from '@quiteer/electronup'

export default defineConfig({
  builderConfig: builderConfig((env: ConfigEnv) => {
    console.log('builderConfig env: ', env)
    return { }
  })
})
