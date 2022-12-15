import { resolve } from 'path'
import type { ChildProcessWithoutNullStreams } from 'child_process'
import { spawn } from 'child_process'
import type { Options } from 'tsup'
import { config as getEnv } from 'dotenv'
import electron from 'electron'
import type { ElectronupConfig, TsupConfig } from '@/typings/electronup'
import { DefaultDirs, store } from '@/utils'

const defaultEnvPath = resolve(store.root, '.env')
const { parsed: defaultEnv } = getEnv({ path: defaultEnvPath })

const getModeDev = () => {
  const path = `${defaultEnvPath}.${store.mode}`
  const { parsed, error } = getEnv({ path })
  if (error)
    throw new Error(`未能加载 .env.${store.mode} 下的环境变量,检查文件是否存在！`)

  return {
    ...defaultEnv,
    ...parsed
  }
}

const injectEnv = () => {
  const { command, port } = store

  const env = getModeDev()
  if (command === 'serve') {
    return {
      ...env,
      NODE_ENV: 'development',
      RENDER_PORT: String(port)
    }
  }

  return {
    ...env,
    NODE_ENV: 'production'
  }
}

export function getTsupConfig(config: TsupConfig, allConfig: ElectronupConfig) {
  const { command, root, minify } = store
  const isServe = command === 'serve'

  const userConfig = {
    minify: minify === false ? false : isServe,
    ...config
  }

  const defaultConfig: Options = {
    external: ['electron', ...(config.external ?? [])],
    entry: { electron: resolve(root, allConfig.mainDir || DefaultDirs.mainDir, 'index.ts') },
    outDir: allConfig.resourceDir || DefaultDirs.resourceDir,
    watch: isServe,
    dts: false,
    clean: false,
    env: injectEnv(),
    async onSuccess() {
      if (isServe)
        return startElectron(resolve(root, allConfig.resourceDir || DefaultDirs.resourceDir, 'electron.js'))
    }
  }

  return { ...userConfig, ...defaultConfig }
}

let electronProcess: ChildProcessWithoutNullStreams | null
let manualRestart = false

function startElectron(mainPath: string) {
  if (electronProcess) {
    manualRestart = true
    electronProcess.pid && process.kill(electronProcess.pid)
    electronProcess = null

    setTimeout(() => {
      manualRestart = false
    }, 5000)
  }

  electronProcess = spawn(electron as any, [mainPath, '--inspect=9528'])

  electronProcess.stdout.on('data', removeJunk)

  electronProcess.stderr.on('data', removeJunk)

  electronProcess.on('close', () => {
    manualRestart || process.exit()
  })
}

function removeJunk(chunk: string) {
  if (/\d+-\d+-\d+ \d+:\d+:\d+\.\d+ Electron(?: Helper)?\[\d+:\d+] /.test(chunk))
    return false
  if (/\[\d+:\d+\/|\d+\.\d+:ERROR:CONSOLE\(\d+\)\]/.test(chunk))
    return false
  if (/ALSA lib [a-z]+\.c:\d+:\([a-z_]+\)/.test(chunk))
    return false

  const data = chunk.toString().split(/\r?\n/)
  let log = ''
  data.forEach((line) => {
    log += `  ${line}\n`
  })
  console.info(log)
}
