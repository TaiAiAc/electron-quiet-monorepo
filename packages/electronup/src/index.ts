import { resolve } from 'path'
import type { UserElectronupConfig } from './typings/electronup'

export const defineConfig = (config: UserElectronupConfig): UserElectronupConfig => config

export type { ElectronupConfig, ViteConfig, ConfigEnv, TsupConfig, BuilderConfig } from './typings/electronup'

export const getLoadUrl = (env: 'development' | 'production' | string, port: string) => {
  return env === 'development'
    ? `http://localhost:${port}`
    : `file://${resolve(__dirname, 'index.html')}`
}
