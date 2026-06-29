import type { MemoryNode } from "../memory/memoryGraph"

export interface KernelAPI {
  snapshot(): unknown
}

export interface MemoryAPI {
  getAll(): MemoryNode[]
  latest(limit: number): MemoryNode[]
}
