import type { UserConfig } from 'vite'
import type { Options } from 'tsup'
import type { CliOptions } from 'electron-builder'
import type { ElectronupConfig } from '../typings/electronup'
import { store } from '../utils'
import { getBuilderConfig } from './builder.config'
import { getTsupConfig } from './tsup.config'
import { getViteConfig } from './vite.config'

interface InitConfig {
  viteConfig: UserConfig
  tsupConfig: Options
  preloadTsup?: Options | Options[]
  builderConfig?: CliOptions
}

export async function getElectronupConfig(config: ElectronupConfig) {
  const { viteConfig, tsupConfig, preloadTsup } = config

  const vite = getViteConfig(viteConfig || {})
  const tsup = getTsupConfig(tsupConfig || {})

  const initConfig: InitConfig = {
    viteConfig: vite,
    tsupConfig: tsup
  }

  if (store.command === 'build') {
    const { builderConfig, outPlatform } = config

    const builder = await getBuilderConfig(builderConfig, outPlatform)
    initConfig.builderConfig = builder
  }

  preloadTsup && (initConfig.preloadTsup = preloadTsup)

  return initConfig
}
