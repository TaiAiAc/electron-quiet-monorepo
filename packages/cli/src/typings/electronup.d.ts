import type { CliOptions } from 'electron-builder';
import type { UserConfig, UserConfigFn } from 'vite';
import type { Options } from 'tsup';

/**
 * 像配置里注入环境变量
 */
export interface ConfigEnv {
  command: 'build' | 'serve';
}

export type UserViteConfig = UserConfig | UserConfigFn

export type UserTsupConfigFn = (env: ConfigEnv) => Options | Options[]
export type UserTsupConfig = Options | Options[] | UserTsupConfigFn

export type UserBuildConfigFn = (env: ConfigEnv) => CliOptions
export type UserBuildConfig = CliOptions | UserBuildConfigFn

export interface ElectronupConfig {
  viteConfig: UserViteConfig
  tsupConfig: UserTsupConfig
  builderConfig: UserBuildConfig
  /** 
   * 渲染进程 主进程 输出目录
   * @default 'dist'
   */
  buildDir?: string
  /** 
   * electron-builder 输出目录
   * @default 'out'
   */
  outDir?: string
}

export type ElectronupConfigFn = (env: ConfigEnv) => ElectronupConfig
export type UserElectronupConfig = ElectronupConfig | ElectronupConfigFn


