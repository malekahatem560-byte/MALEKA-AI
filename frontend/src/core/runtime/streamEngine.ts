export type StreamEvent = {
  type: "log" | "status" | "result"
  message: string
}

export function createStream() {
  const listeners: ((e: StreamEvent) => void)[] = []

  return {
    emit(event: StreamEvent) {
      listeners.forEach(l => l(event))
    },

    subscribe(fn: (e: StreamEvent) => void) {
      listeners.push(fn)
    },

    run(command: string) {
      this.emit({ type: "log", message: `> ${command}` })

      setTimeout(() => {
        this.emit({ type: "status", message: "[ANALYZE] parsing input" })
      }, 200)

      setTimeout(() => {
        this.emit({ type: "status", message: "[PROCESS] executing agents" })
      }, 600)

      setTimeout(() => {
        this.emit({ type: "result", message: "[DONE] execution complete" })
      }, 1000)
    }
  }
}
