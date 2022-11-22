interface ElectronupConfig {
  builderConfig: import('electron-builder').CliOptions
  viteConfig: import('vite').InlineConfig
  tsupConfig: import('tsup').Options
}
