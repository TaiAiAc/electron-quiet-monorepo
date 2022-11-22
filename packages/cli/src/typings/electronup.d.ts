import type { CliOptions } from 'electron-builder';
import type { InlineConfig } from 'vite';
import type { Options } from 'tsup';

export interface ElectronupConfig {
  builderConfig: CliOptions
  viteConfig: InlineConfig
  tsupConfig: Options
  /** 渲染进程输出目录 */
  renderDir: string
  /** 主进程输出目录 */
  mainDir: string
  /** electron-builder 输出目录 */
  outDir: string
}
