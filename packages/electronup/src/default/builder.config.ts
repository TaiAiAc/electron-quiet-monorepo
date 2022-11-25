import { resolve } from 'path'
import type { CliOptions } from 'electron-builder'
import { readJSON } from 'fs-extra'
import type { BuilderConfig, ElectronupConfig } from '../typings/electronup'
import { store } from '../utils'

export async function getBuilderConfig(config: BuilderConfig, outPlatform: ElectronupConfig['outPlatform'], outDir: string) {
  const packages = await readJSON(resolve(store.root, 'package.json'))

  const defaultConfig: CliOptions = {
    config: {
      asar: false,
      appId: 'org.TaiAi.electron-vue3-quiet',
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
      files: ['dist/**/*'],
      extraFiles: ['lib'],
      directories: {
        output: config.directories?.output || outDir
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

  if (outPlatform) {
    if (Array.isArray(outPlatform)) {
      outPlatform.forEach((platform) => {
        defaultConfig[platform] = true
      })
    }
    else {
      defaultConfig[outPlatform] = true
    }
  }

  return defaultConfig
}

