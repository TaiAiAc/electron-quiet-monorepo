import { resolve } from 'path'
import type { CliOptions } from 'electron-builder'
import { readJSON } from 'fs-extra'
import type { BuilderConfig, ElectronupConfig } from '../typings/electronup'
import { store } from '../utils'

export async function getBuilderConfig(config: BuilderConfig, allConfig: ElectronupConfig) {
  const packages = await readJSON(resolve(store.root, 'package.json'))

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
      files: [`${allConfig.resourceDir || store.resourceDir}/**/*`],
      extraFiles: [allConfig.libDir || store.libDir],
      directories: {
        output: allConfig.outDir || config.directories?.output || store.outDir
      },
      publish: [
        {
          provider: 'generic',
          url: 'http://127.0.0.1'
        }
      ],
      dmg: {
        contents: [
          {
            x: 410,
            y: 150,
            type: 'link',
            path: '/Applications'
          },
          {
            x: 130,
            y: 150,
            type: 'file'
          }
        ]
      },
      mac: { icon: 'icons/icon.icns', target: 'dmg' },
      win: { icon: 'icons/icon.ico', target: 'nsis' },
      linux: {
        target: ['AppImage', 'rpm', 'deb'],
        icon: 'icons',
        desktop: {
          StartupNotify: 'false',
          Encoding: 'UTF-8',
          MimeType: 'x-scheme-handler/deeplink'
        }
      },
      ...config
    }
  }

  if (allConfig.outPlatform) {
    if (Array.isArray(allConfig.outPlatform)) {
      allConfig.outPlatform.forEach((platform) => {
        defaultConfig[platform] = true
      })
    }
    else {
      defaultConfig[allConfig.outPlatform] = true
    }
  }

  return defaultConfig
}

