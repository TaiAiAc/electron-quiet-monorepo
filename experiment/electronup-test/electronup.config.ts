import type { ConfigEnv } from '@quiteer/electronup'
import { defineConfig } from '@quiteer/electronup'

export default defineConfig((env: ConfigEnv) => {
  console.log('defineConfig env: ', env)
  return {
    builderConfig: {
    },
    outPlatform: ['ia32', 'x64'],
    outDir: 'out',
    resourceDir: 'resource',
    mainDir: 'main',
    renderDir: 'render',
    publicDir: 'public',
    libDir: 'lib'
  }
})
