import { tsupConfig } from '@quiteer/electronup'

export default tsupConfig({
  name: 'electronup-cli',
  entry: { cli: 'src/cli/index.ts' }
})
