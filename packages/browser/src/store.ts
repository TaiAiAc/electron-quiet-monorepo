export class WinStore<T> {
  private wins: Map<T, number>

  constructor() {
    this.wins = new Map()
  }

  setWin(name: T, id: number) {
    this.wins.set(name, id)
  }

  getWin(id: number) {
    return id
  }

  getWins() {
    return this.wins
  }
}

