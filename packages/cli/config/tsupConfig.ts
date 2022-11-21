import type { Options } from 'tsup'
import { defineConfig } from 'tsup'

export type TsupOptions = Omit<Options, 'dts' | 'clean'>

export function tsupConfig(options: TsupOptions) {
  return defineConfig({
    name: 'main',
    ...options,
    dts: false,
    splitting: false,
    clean: true
  })
}

