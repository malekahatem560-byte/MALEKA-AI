import { memoryGraph } from "./memoryGraph"

export function recordMemory(event: any) {
  memoryGraph.add({
    id: crypto.randomUUID(),
    type: event.type || "event",
    data: event
  })
}
