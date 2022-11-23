# @quiteer/electronup


> 融合构建 electron 应用需要的构建工具,保留原有配置习惯的命令行工具 
> 开发中 ...


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

## 内置的依赖
> 部分依赖已内置 无需重复安装 （开发此脚手架的目的也是给项目 package 瘦瘦身）

```json
{
  "dependencies": {
    "@swc-node/core": "^1.9.1",
    "@swc/core": "^1.3.19",
    "@vitejs/plugin-vue": "^3.2.0",
    "cac": "^6.7.14",
    "electron": "^21.2.2",
    "electron-builder": "^23.6.0",
    "fs-extra": "^10.1.0",
    "pirates": "^4.0.5",
    "portfinder": "^1.0.32",
    "rimraf": "^3.0.2",
    "tsconfig-paths": "^4.1.0",
    "tsup": "^6.4.0",
    "typescript": "^4.9.3",
    "vite": "^3.2.3"
  }
}
```

### 暴露的api

```ts
import type { CliOptions } from 'electron-builder'
import type { UserConfig, UserConfigFn } from 'vite'
import type { Options } from 'tsup'

/**
 * 像配置里注入环境变量
 */
interface ConfigEnv {
  command: 'build' | 'serve'
}

type UserViteConfig = UserConfig | UserConfigFn

type UserTsupConfigFn = (env: ConfigEnv) => Options | Options[]
type UserTsupConfig = Options | Options[] | UserTsupConfigFn

type UserBuildConfigFn = (env: ConfigEnv) => CliOptions
type UserBuildConfig = CliOptions | UserBuildConfigFn

interface ElectronupConfig {
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

type ElectronupConfigFn = (env: ConfigEnv) => ElectronupConfig
type UserElectronupConfig = ElectronupConfig | ElectronupConfigFn

declare const viteConfig: (userConfigExport: UserViteConfig) => UserViteConfig

declare const tsupConfig: (userTsupConfig: UserTsupConfig) => UserTsupConfig

declare const buildConfig: (configFn: UserBuildConfig) => UserBuildConfig

declare const defineConfig: (electronupConfig: UserElectronupConfig) => UserElectronupConfig

export { ConfigEnv, ElectronupConfig, ElectronupConfigFn, UserBuildConfig, UserBuildConfigFn, UserElectronupConfig, UserTsupConfig, UserTsupConfigFn, UserViteConfig, buildConfig, defineConfig, tsupConfig, viteConfig }
```

#### 获取类型提示

引入导出的 api 即可获取类型提示
