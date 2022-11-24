import type { UserViteConfig } from './typings/vite'
import type { UserTsupConfig } from './typings/tsup'
import type { UserBuilderConfig } from './typings/builder'
import type { UserElectronupConfig } from './typings/electronup'

export const viteConfig = (config: UserViteConfig): UserViteConfig => config

export const tsupConfig = (config: UserTsupConfig): UserTsupConfig => config

export const builderConfig = (config: UserBuilderConfig): UserBuilderConfig => config

export const defineConfig = (config: UserElectronupConfig): UserElectronupConfig => config

export type { ElectronupConfig } from './typings/electronup'
export type { ConfigEnv } from './typings/env'
