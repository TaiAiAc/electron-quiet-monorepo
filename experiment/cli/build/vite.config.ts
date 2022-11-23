import { viteConfig } from '@quiteer/electronup'

export default viteConfig((env) => {
  return {
    base: './',
    server: {
      host: '0.0.0.0'
    }
  }
})
