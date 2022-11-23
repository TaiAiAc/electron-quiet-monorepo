import { buildConfig } from '@quiteer/electronup'

export default buildConfig((evn) => {
  return {
    config: {
      asar: false,
      appId: 'org.TaiAi.electron-vue3-quiet',
      protocols: {
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
        createStartMenuShortcut: true
      },
      files: ['dist/**/*'],
      extraFiles: ['lib'],
      directories: {
        output: 'out'
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
      }
    },
    dir: true
  }
})

