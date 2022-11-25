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
  const { viteConfig, tsupConfig, preloadTsup, buildDir = 'dist' } = config

  const vite = getViteConfig(viteConfig || {}, buildDir)
  const tsup = getTsupConfig(tsupConfig || {}, buildDir)

  const initConfig: InitConfig = {
    viteConfig: vite,
    tsupConfig: tsup
  }

  if (store.command === 'build') {
    const { builderConfig, outPlatform, outDir = 'out' } = config

    const builder = await getBuilderConfig(builderConfig, outPlatform, outDir)
    initConfig.builderConfig = builder
  }

  preloadTsup && (initConfig.preloadTsup = preloadTsup)

  return initConfig
}
