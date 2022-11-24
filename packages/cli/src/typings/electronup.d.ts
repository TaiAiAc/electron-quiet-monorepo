import type { UserViteConfig } from './vite';
import type { UserTsupConfig } from './tsup';
import type { UserBuilderConfig } from './builder';


/**
 * 像配置里注入环境变量
 */
export interface ConfigEnv {
  command: 'build' | 'serve';
}


export interface ElectronupConfig {
  viteConfig?: UserViteConfig
  tsupConfig?: UserTsupConfig
  builderConfig: UserBuilderConfig
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


