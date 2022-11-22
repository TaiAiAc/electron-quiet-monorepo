# @quiteer/electronup


> 融合构建 electron 应用需要的构建工具,保留原有配置习惯的命令行工具 
> vite tsup electorn-builder 已内置 无需重复安装

## 安装

```bash
npm i @quiteer/electronup
```
```bash
yarn add @quiteer/electronup
```
```bash
pnpm add @quiteer/electronup
```


## 使用

- 查看命令行指令
  - `electornup -h`
- 查看命令行版本
  - `electornup -v`
- 开发环境
  - `electornup`
  - `electornup dev`
  - `electornup -c [file]`
  - `electornup --config [file]`
- 构建打包
  - `electornup build`

### 暴露的api

```ts
import type { CliOptions } from 'electron-builder'
import type { InlineConfig, UserConfigExport } from 'vite'
import type { Options } from 'tsup'

interface ElectronupConfig {
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

declare const viteConfig: (config: UserConfigExport) => UserConfigExport

declare const tsupConfig: (config: Options) => Options | Options[] | ((overrideOptions: Options) => Options | Options[] | Promise<Options | Options[]>)

declare const buildConfig: (config: CliOptions) => CliOptions

declare const defineConfig: (options: ElectronupConfig) => ElectronupConfig

export { ElectronupConfig, buildConfig, defineConfig, tsupConfig, viteConfig }
```

#### 获取类型提示

引入导出的 api 即可获取类型提示
