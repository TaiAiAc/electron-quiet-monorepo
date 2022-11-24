import type { AliasOptions, PluginOption, ResolveOptions, UserConfig } from 'vite';
import type { ConfigEnv } from './env';


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

export type ViteConfigFn = (env: ConfigEnv) => ViteConfig

export type UserViteConfig = ViteConfig | ViteConfigFn
