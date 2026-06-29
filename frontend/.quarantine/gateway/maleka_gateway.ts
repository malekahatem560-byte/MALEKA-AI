import { eventBus } from "../events/eventBus"
import { memoryGraph } from "../memory/memoryGraph"
import { runAgentPipeline } from "../runtime/runtime"

class MalekaGateway {
  async execute(input: unknown) {
    const ts = Date.now()

    eventBus.emit("GATEWAY.INPUT", {
      input,
      ts,
    })

    const context = {
      input,
      ts,
      memory: memoryGraph.getAll(),
    }

    const result = await runAgentPipeline(context)

    eventBus.emit("GATEWAY.RESULT", {
      result,
      ts: Date.now(),
    })

    return result
  }

  getMemory() {
    return memoryGraph.getAll()
  }
}

export const malekaGateway = new MalekaGateway()
