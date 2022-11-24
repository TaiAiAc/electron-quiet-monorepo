import type { ConfigEnv } from '@quiteer/electronup'
import { defineConfig } from '@quiteer/electronup'

export default defineConfig((env: ConfigEnv) => {
  console.log('defineConfig env: ', env)
  return {
    builderConfig: { }
  }
})
