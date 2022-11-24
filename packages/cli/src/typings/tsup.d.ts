import type { ConfigEnv } from './electronup';


export interface TsupConfig {
  entry?: string[] | Record<string, string>
  name?: string
  outDir?: string
  target?: string | string[];
  minify?: boolean;
  external?: (string | RegExp)[];
  noExternal?: (string | RegExp)[];
}

export type TsupConfigFn = (env: ConfigEnv) => TsupConfig

export type UserTsupConfig = TsupConfig | TsupConfigFn
