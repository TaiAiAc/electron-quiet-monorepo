# @quiteer/electronup


> 融合构建 electron 应用需要的构建工具,保留原有配置习惯的命令行工具 



## 插件前置

```json
{
  "peerDependencies": {
    "@types/node": ">= 16",
    "electron": ">= 20"
  }
}
```




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
    "dotenv": "^16.0.3",
    "electron-builder": "^23.6.0",
    "fs-extra": "^10.1.0",
    "inquirer": "^9.1.4",
    "neofetch": "^7.1.0",
    "pirates": "^4.0.5",
    "portfinder": "^1.0.32",
    "rimraf": "^3.0.2",
    "tsconfig-paths": "^4.1.0",
    "tsup": "^6.4.0",
    "typescript": "^4.9.3",
    "vite": "^3.2.4"
  }
}
```

### 暴露的api

```ts
import type { Configuration } from 'electron-builder'
import type { AliasOptions, PluginOption, ResolveOptions, UserConfig } from 'vite'
import type { Options } from 'tsup'

interface ViteConfig {
  base?: string
  resolve?: ResolveOptions & {
    alias?: AliasOptions
  }
  plugins?: PluginOption[]
  viteOptions?: Omit<UserConfig, 'root' | 'plugins' | 'resolve' | 'publicDir'>
}

interface TsupConfig {
  entry?: string[] | Record<string, string>
  name?: string
  target?: string | string[]
  minify?: boolean
  external?: (string | RegExp)[]
  noExternal?: (string | RegExp)[]
}

interface BuilderConfig extends Configuration { }

type Platform = 'x64' | 'ia32' | 'armv7l' | 'arm64' | 'universal' | 'dir'

interface ElectronupConfig {
  viteConfig?: ViteConfig
  tsupConfig?: TsupConfig
  preloadTsup?: Options | Options[]
  builderConfig: BuilderConfig

  /**
   * 输出平台
   */
  outPlatform?: Platform | Platform[]

  /**
   * 渲染进程入口目录
   * @default 'render'
   */
  renderDir?: string

  /**
   * 主进程入口目录
   * @default 'main'
   */
  mainDir?: string

  /**
  * 静态资源目录
  * @default 'public'
  */
  publicDir?: string

  /**
  * 动态库目录
  * @default 'lib'
  */
  libDir?: string

  /**
  * 资源构建输出目录
  * @default 'dist'
  */
  resourceDir?: string

  /**
   * electron-builder 输出目录
   * @default 'out'
   */
  outDir?: string
}

interface ConfigEnv {
  command: 'build' | 'serve'
}

type ElectronupConfigFn = (env: ConfigEnv) => ElectronupConfig
type UserElectronupConfig = ElectronupConfig | ElectronupConfigFn

declare const defineConfig: (config: UserElectronupConfig) => UserElectronupConfig

declare const loadUrl: string

export { BuilderConfig, ConfigEnv, ElectronupConfig, TsupConfig, ViteConfig, defineConfig, loadUrl }

```

#### 获取类型提示

引入导出的 api 即可获取类型提示

## 环境变量配置

根目录下的 `.env` 文件在任何环境下都会注入到业务代码中

### command

目前 `command` 命令仅支持 `dev` 及 `build` 

`dev` 指令下向 `process.env` 中注入 `NODE_ENV` 字段 为 `develpoment` 

`build` 指令下向 `process.env` 中注入 `NODE_ENV` 字段 为 `production` 

双进程下区分环境略有不同 ， 主进程代码中直接访问  `process.env` 上的  `NODE_ENV` 即可，渲染进程中访问 `vite` 提供的 `import.meta.env` 获取

```typescript
// main.ts 
// dev
console.log('NODE_ENV', process.env.NODE_ENV)  // NODE_ENV development

// build
console.log('NODE_ENV', process.env.NODE_ENV)  // NODE_ENV production 
```

```typescript
// render.ts 
// dev
console.log('isDev', import.meta.env.DEV)  // isDev true

// build
console.log('isDev', import.meta.env.DEV)  // isDev true
```



### mode 

通过添加命令行指令 `-m xxx | -mode xxx` 指定加载环境变量文件以满足不同环境下的不同环境变量。

`mode` 指令传入的 `mode` 字符串需与根目录下的 `env` 文件一致。 规则如下

```shell
electronup -m test
```

命令行运行后根据 `mode` 参数加载根目录下的 `.env.test` 环境变量文件

即 `electronup -m test`

`.env`

`.env.test`

 不传 mode 参数，默认根据环境区分加载环境变量。

`electronup dev`

`.env`

`.env.devlepoment`

`electronup build`

`.env`

`.env.production`

当然也可通过传入 mode 参数使 dev 环境加载 production 的环境变量。

`electronup dev -m production` 



#### 文件命名

`.env` 

`.env.development`

`.env.production`

`.env.test`

`.env.staging`



### 预置配置

可自定义配置覆盖默认配置。

vite

```typescript
 const defaultConfig: UserConfig = {
    base: config.base || './',
    mode,
    root: allConfig.renderDir || DefaultDirs.renderDir,
    publicDir: resolve(store.root, allConfig.publicDir || DefaultDirs.publicDir),
    server: { host: '0.0.0.0' },
    plugins: [command === 'serve' ? vue() : undefined, ...(config.plugins ? config.plugins : [])],
    ...config.viteOptions,
    build: {
      outDir: resolve(store.root, allConfig.resourceDir || DefaultDirs.resourceDir),
      target: 'esnext',
      minify: 'esbuild',
      reportCompressedSize: false,
      emptyOutDir: false,
      chunkSizeWarningLimit: 2000
    }
  }
```

tsup

```typescript
 const defaultConfig: Options = {
    minify: false,
    ...config,
    external: ['electron', ...(config.external ? config.external : [])],
    entry: { electron: resolve(root, allConfig.mainDir || DefaultDirs.mainDir, 'index.ts') },
    outDir: allConfig.resourceDir || DefaultDirs.resourceDir,
    watch: command === 'serve',
    dts: false,
    clean: false,
    env: injectEnv(),
    async onSuccess() {
      if (command === 'serve')
        return startElectron(resolve(root, allConfig.resourceDir || DefaultDirs.resourceDir, 'electron.js'))
    }
  }
```

electron-builder

```typescript
const defaultConfig: CliOptions = {
    config: {
      asar: true,
      appId: 'org.quiter.electron-up',
      productName: packages.name,
      protocols: {
        name: packages.name,
        schemes: ['deeplink']
      },
      nsis: {
        oneClick: false,
        language: '2052',
        perMachine: true,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
        runAfterFinish: true,
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        artifactName: `${packages.name} \${arch} Setup ${packages.version}.\${ext}`
      },
      files: [`${allConfig.resourceDir || DefaultDirs.resourceDir}/**/*`],
      extraFiles: [allConfig.libDir || DefaultDirs.libDir],
      directories: {
        output: allConfig.outDir || config.directories?.output || DefaultDirs.outDir
      },
      ...config 
    }
  }
```




## 示例

> https://github.com/TaiAiAc/electron-quiet-monorepo/tree/main/experiment/electronup-test
