
import { Configuration } from 'electron-builder';
import type { AliasOptions, PluginOption, ResolveOptions, UserConfig } from 'vite';
import type { Options } from 'tsup'

export interface ViteConfig {
  base?: string
  root?: string
  outDir?: string
  publicDir?: string
  resolve?: ResolveOptions & {
    alias?: AliasOptions;
  }
  plugins?: PluginOption[]
  viteOptions?: Omit<UserConfig, 'plugins' | 'resolve' | 'publicDir' | 'outDir' | 'build' | 'server'>
}

export interface TsupConfig {
  entry?: string[] | Record<string, string>
  name?: string
  outDir?: string
  target?: string | string[];
  minify?: boolean;
  external?: (string | RegExp)[];
  noExternal?: (string | RegExp)[];
}

export interface BuilderConfig extends Configuration { }

type Platform = 'x64' | 'ia32' | 'armv7l' | 'arm64' | 'universal' | 'dir'

export interface ElectronupConfig {
  viteConfig?: ViteConfig
  tsupConfig?: TsupConfig
  preloadTsup?: Options | Options[]
  builderConfig: BuilderConfig
  /**
   * 输出平台
   */
  outPlatform?: Platform | Platform[]
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

export interface ConfigEnv {
  command: 'build' | 'serve'
}

export type ElectronupConfigFn = (env: ConfigEnv) => ElectronupConfig
export type UserElectronupConfig = ElectronupConfig | ElectronupConfigFn

