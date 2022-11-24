import type { UserElectronupConfig } from './typings/electronup'

export const defineConfig = (config: UserElectronupConfig): UserElectronupConfig => config

export type { ElectronupConfig, ViteConfig, TsupConfig, BuilderConfig } from './typings/electronup'
export type { ConfigEnv } from './typings/env'
