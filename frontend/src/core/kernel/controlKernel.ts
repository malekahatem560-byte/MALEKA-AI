import { memoryGraph } from "../memory/memoryGraph"
import type { KernelAPI } from "../contract/kernelContract"

export class ControlKernel implements KernelAPI {

  pause() {
    return { status: "paused" }
  }

  resume() {
    return { status: "running" }
  }

  snapshot() {
    return memoryGraph.getAll()
  }

  replay(limit: number = 10) {
    return memoryGraph.getAll().slice(-limit)
  }

  getMemory(limit?: number) {
    const all = memoryGraph.getAll()
    return limit ? all.slice(-limit) : all
  }

  getFullMemory() {
    return memoryGraph.getAll()
  }
}

export const controlKernel = new ControlKernel()
