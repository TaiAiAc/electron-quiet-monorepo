import type { UserConfigExport } from 'vite'
import { defineConfig } from 'vite'

export const viteConfig = (config: UserConfigExport) => {
  return defineConfig(config)
}
