import { resolve } from 'path'
import type { CliOptions } from 'electron-builder'
import { Arch, Platform as Platforms } from 'electron-builder'
import { readJSON } from 'fs-extra'
import type { BuilderConfig, ElectronupConfig, Platform } from '../typings/electronup'
import { DefaultDirs, store, user } from '../utils'

export async function getBuilderConfig(config: BuilderConfig, allConfig: ElectronupConfig) {
  const packages = await readJSON(resolve(store.root, 'package.json'))

  const defaultConfig: CliOptions = {
    config: {
      asar: user.asar,
      appId: 'org.quiteer.electronup',
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
    },
    targets: Platforms.WINDOWS.createTarget('nsis', Arch.ia32, Arch.x64)
  }

  user.isCustom && user.dir && (defaultConfig.dir = user.dir)

  return defaultConfig
}

