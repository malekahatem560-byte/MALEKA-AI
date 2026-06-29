import { memoryGraph } from "../memory/memoryGraph"

export class ReplayEngine {
  private history = memoryGraph.getAll()

  getSnapshot(at: number) {
    return this.history.slice(0, at)
  }

  getLength() {
    return this.history.length
  }
}

export const replayEngine = new ReplayEngine()
