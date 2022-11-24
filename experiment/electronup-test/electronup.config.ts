import type { ConfigEnv } from '@quiteer/electronup'
import { builderConfig, defineConfig } from '@quiteer/electronup'

export default defineConfig((env) => {
  console.log('defineConfig env: ', env)
  return {
    builderConfig: builderConfig((env: ConfigEnv) => {
      console.log('builderConfig env: ', env)
      return { }
    })
  }
})
