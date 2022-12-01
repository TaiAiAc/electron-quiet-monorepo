import type { Arch } from 'electron-builder'

type Platform = 'win' | 'mac' | 'linux'
type ArchType = Arch.x64 | Arch.ia32 | Arch.armv7l | Arch.arm64 | Arch.universal
type Option = `${Platform}-${ArchType}`

class User {
  static instance: User

  // 是否自定义
  #isCustom = false
  // 是否执行代码压缩
  #minify = true
  // 是否生成安装包
  #dir = false
  // 是否开启asar
  #asar = true
  // 请选择构建模式
  #pattern: Map<Platform, ArchType[]>

  static getInstance() {
    if (this.instance)
      return this.instance
    return (this.instance = new User())
  }

  get isCustom() {
    return this.#isCustom
  }

  get minify() {
    return this.#minify
  }

  get dir() {
    return this.#dir
  }

  get asar() {
    return this.#asar
  }

  get pattern() {
    return this.#pattern
  }

  setIsCustom(isCustom: boolean) {
    this.#isCustom = isCustom
  }

  setMinify(minify: boolean) {
    this.#minify = minify
  }

  setDir(dir: boolean) {
    this.#dir = dir
  }

  setAsar(asar: boolean) {
    this.#asar = asar
  }

  setPattern(pattern: Option[]) {
    const maps = pattern.reduce((pre, now) => {
      const [key, value] = now.split('-') as [Platform, ArchType]
      return pre.set(key, [...(pre.get(key) ?? []), value])
    }, new Map<Platform, ArchType[]>())

    this.#pattern = maps
  }
}

export const user = User.getInstance()
