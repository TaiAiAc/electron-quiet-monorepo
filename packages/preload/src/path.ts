import { basename, dirname, extname, join, parse, relative, resolve } from 'path'

export interface PreLoadPath {
  basename (...args: Parameters<typeof basename>): ReturnType<typeof basename>
  dirname (...args: Parameters<typeof dirname>): ReturnType<typeof dirname>
  extname (...args: Parameters<typeof extname>): ReturnType<typeof extname>
  join (...args: Parameters<typeof join>): ReturnType<typeof join>
  parse (...args: Parameters<typeof parse>): ReturnType<typeof parse>
  relative (...args: Parameters<typeof relative>): ReturnType<typeof relative>
  resolve (...args: Parameters<typeof resolve>): ReturnType<typeof resolve>
}

export const $path: PreLoadPath = {
  basename: (...args) => basename(...args),
  dirname: (...args) => dirname(...args),
  extname: (...args) => extname(...args),
  join: (...args) => join(...args),
  parse: (...args) => parse(...args),
  relative: (...args) => relative(...args),
  resolve: (...args) => resolve(...args)
}

