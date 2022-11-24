import { viteConfig } from '@quiteer/electronup'

export default viteConfig((env) => {
  console.info('client vite: ', env)
  return {
    base: './',
    server: {
      host: '0.0.0.0'
    }
  }
})
