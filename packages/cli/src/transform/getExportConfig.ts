import type { UserViteConfig, ViteConfig, ViteConfigFn } from '../typings/vite'
import { getViteConfig } from '../default/vite.config'
import { getTsupConfig } from '../default/tsup.config'
import type { TsupConfig, TsupConfigFn, UserTsupConfig } from '../typings/tsup'
import type { BuilderConfig, BuilderConfigFn, UserBuilderConfig } from '../typings/builder'
import type { ConfigEnv } from './../typings/electronup'

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

export const viteConfig = (config: UserViteConfig, env: ConfigEnv) => getViteConfig(exportViteConfig(config, env))

const exportTsupConfig = (config: UserTsupConfig, env: ConfigEnv): TsupConfig => {
  const typeStr = typeof config
  if (typeStr === 'function') {
    const option = (<TsupConfigFn>config)(env)
    return option
  }

  if (typeStr === 'object')
    return config as TsupConfig

  throw new Error('vite 配置错误')
}

export const tsupConfig = (config: UserTsupConfig, env: ConfigEnv) => getTsupConfig(exportTsupConfig(config, env), env.command)

const exportBuilderConfig = (config: UserBuilderConfig, env: ConfigEnv): BuilderConfig => {
  const typeStr = typeof config
  if (typeStr === 'function') {
    const option = (<BuilderConfigFn>config)(env)
    return option
  }

  if (typeStr === 'object')
    return <BuilderConfig>config

  throw new Error('vite 配置错误')
}

export const builderConfig = (config: UserBuilderConfig, env: ConfigEnv) => getTsupConfig(exportBuilderConfig(config, env), env.command)
