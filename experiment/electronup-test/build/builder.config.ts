import { buildConfig } from '@quiteer/electronup'
import type { ConfigEnv } from '@quiteer/electronup'

export const builderOptions = buildConfig((env: ConfigEnv) => {
  console.log('env: ', env)
  return { }
})

