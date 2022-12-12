import type { ConfigEnv } from '@quiteer/electronup'
import { defineConfig } from '@quiteer/electronup'
import vue from '@vitejs/plugin-vue'

export default defineConfig((env: ConfigEnv) => {
  console.log('defineConfig env: ', env)
  return {
    viteConfig: {
      plugins: [vue()]
    },
    builderConfig: { }
  }
})
