import type { CliOptions } from 'electron-builder';
import { ConfigEnv } from './env';

export interface BuilderConfig extends CliOptions {}

export type BuilderConfigFn = (env: ConfigEnv) => BuilderConfig

export type UserBuilderConfig = BuilderConfig | BuilderConfigFn
