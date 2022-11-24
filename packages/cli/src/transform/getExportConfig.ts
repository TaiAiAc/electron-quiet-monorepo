import type { UserViteConfig, ViteConfig, ViteConfigFn } from '../typings/vite'
import type { TsupConfig, TsupConfigFn, UserTsupConfig } from '../typings/tsup'
import type { BuilderConfig, BuilderConfigFn, UserBuilderConfig } from '../typings/builder'
import type { ElectronupConfig, ElectronupConfigFn, UserElectronupConfig } from '../typings/electronup'
import type { ConfigEnv } from '../typings/env'
import { getBuilderConfig, getElectronupConfig, getTsupConfig, getViteConfig } from '../default'

const exportViteConfig = (config: UserViteConfig, env: ConfigEnv): ViteConfig => {
  const typeStr = typeof config
  if (typeStr === 'function') {
    const option = (<ViteConfigFn>config)(env)
    return option
  }

  if (typeStr === 'object')
    return <ViteConfig>config

  throw new Error('vite 配置错误')
}

const exportTsupConfig = (config: UserTsupConfig, env: ConfigEnv): TsupConfig => {
  const typeStr = typeof config
  if (typeStr === 'function') {
    const option = (<TsupConfigFn>config)(env)
    return option
  }

  if (typeStr === 'object')
    return config as TsupConfig

  throw new Error('tsup 配置错误')
}

const exportBuilderConfig = (config: UserBuilderConfig, env: ConfigEnv): BuilderConfig => {
  const typeStr = typeof config
  if (typeStr === 'function') {
    const option = (<BuilderConfigFn>config)(env)
    return option
  }

  if (typeStr === 'object')
    return <BuilderConfig>config

  throw new Error('electron-builder 配置错误')
}

const exportElectronupConfig = (config: UserElectronupConfig, env: ConfigEnv): ElectronupConfig => {
  const typeStr = typeof config
  if (typeStr === 'function') {
    const option = (<ElectronupConfigFn>config)(env)
    return option
  }

  if (typeStr === 'object')
    return <ElectronupConfig>config

  throw new Error('electronup 配置错误')
}

export const viteConfig = (config: UserViteConfig, env: ConfigEnv) => getViteConfig(exportViteConfig(config, env))

export const tsupConfig = (config: UserTsupConfig, env: ConfigEnv) => getTsupConfig(exportTsupConfig(config, env), env.command)

export const builderConfig = (config: UserBuilderConfig, env: ConfigEnv) => getBuilderConfig(exportBuilderConfig(config, env))

export const electronupConfig = (config: UserElectronupConfig, env: ConfigEnv) => getElectronupConfig(exportElectronupConfig(config, env))
