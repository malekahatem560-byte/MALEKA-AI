import { memoryGraph, type MemoryNode } from "../memory/memoryGraph"

export function pushMemory(event: Omit<MemoryNode, "timestamp">) {
  memoryGraph.add({
    ...event,
  })
}
