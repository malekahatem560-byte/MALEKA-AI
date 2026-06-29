import { controlKernel } from "../core/kernel/controlKernel"

export const kernelAPI = {
  pause() {
    return controlKernel.pause()
  },

  resume() {
    return controlKernel.resume()
  },

  snapshot() {
    return controlKernel.snapshot()
  },

  replay(index?: number) {
    return controlKernel.replay(index)
  },

  getState() {
    return controlKernel.snapshot()
  },

  getMemory(limit?: number) {
    return controlKernel.getMemory(limit)
  },

  getFullMemory() {
    return controlKernel.getFullMemory()
  },
}
