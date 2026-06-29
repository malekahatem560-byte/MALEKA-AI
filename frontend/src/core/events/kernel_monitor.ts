import { eventBus } from "./eventBus"

class KernelMonitor {
  private unsubscribe: (() => void) | null = null

  start() {
    this.unsubscribe = eventBus.on((event: any) => {
      switch (event.type) {
        case "COMMAND.RUN": // telemetry only (no execution semantics)
          console.log("[KERNEL CMD]", event.data)
          break

        case "MEMORY.UPDATE":
          console.log("[MEMORY]", event.data)
          break
      }
    })
  }

  stop() {
    this.unsubscribe?.()
    this.unsubscribe = null
  }
}

export const kernelMonitor = new KernelMonitor()
