import { resolve } from 'path'
import type { UserElectronupConfig } from './typings/electronup'

export const defineConfig = (config: UserElectronupConfig): UserElectronupConfig => config

export type { ElectronupConfig, ViteConfig, ConfigEnv, TsupConfig, BuilderConfig } from './typings/electronup'

export const loadUrl = process.env.NODE_ENV === 'development'
  ? `http://localhost:${process.env.RENDER_PORT}`
  : `file://${resolve(__dirname, 'index.html')}`
