import { liveStream } from "../stream/liveStream"

export type MemoryNode = {
  id: string
  type: string
  data: any
  timestamp: number
}

export class MemoryGraph {
  private nodes: MemoryNode[] = []

  add(node: Omit<MemoryNode, "timestamp">) {
    const full: MemoryNode = {
      ...node,
      timestamp: Date.now()
    }

    this.nodes.push(full)

    liveStream.emit({
      type: "memory:add",
      node: full
    })
  }

  getAll() {
    return [...this.nodes]
  }

  snapshot() {
    return this.getAll()
  }
}

export const memoryGraph = new MemoryGraph()
