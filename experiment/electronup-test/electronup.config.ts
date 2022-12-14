import type { ConfigEnv } from '@quiteer/electronup'
import { defineConfig } from '@quiteer/electronup'
import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig((env: ConfigEnv) => {
  console.log('defineConfig env: ', env)
  return {
    viteConfig: {
      plugins: [VueMacros({
        plugins: {
          vue: Vue(),
          vueJsx: VueJsx()
        }
      })]
    },
    builderConfig: {
      asar: false
    }
  }
})
