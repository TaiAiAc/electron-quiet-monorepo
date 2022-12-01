class User {
  static instance: User

  // 是否执行代码压缩
  #minify = true

  // 是否开启asar
  #asar = true

  static getInstance() {
    if (this.instance)
      return this.instance
    return (this.instance = new User())
  }

  get minify() {
    return this.#minify
  }

  get asar() {
    return this.#asar
  }

  setMinify(minify: boolean) {
    this.#minify = minify
  }

  setAsar(asar: boolean) {
    this.#asar = asar
  }
}

export const user = User.getInstance()
