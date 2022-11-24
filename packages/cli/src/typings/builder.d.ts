import type { CliOptions } from 'electron-builder';
import { ConfigEnv } from './electronup';

export interface BuilderConfig extends CliOptions {}

export type BuilderConfigFn = (env: ConfigEnv) => BuilderConfig

export type UserBuilderConfig = BuilderConfig | BuilderConfigFn
