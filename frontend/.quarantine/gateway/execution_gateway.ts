import { eventBus } from "../events/eventBus"
import { memoryGraph } from "../memory/memoryGraph"
import { runAgentPipeline } from "../runtime/runtime"

export class ExecutionGateway {
  async execute(input: unknown) {
    const ts = Date.now()

    // eventBus.emit (telemetry only)("GATEWAY.INPUT", {
      input,
      timestamp: ts,
    })

    const pipelineResult = await runAgentPipeline(input ?? {})

    const result = {
      input,
      output: pipelineResult,
    }

    memoryGraph.add({
      id: crypto.randomUUID(),
      type: "gateway-execution",
      data: result,
    })

    // eventBus.emit (telemetry only)("GATEWAY.RESULT", result)

    return result
  }

  getMemory() {
    return memoryGraph.getAll()
  }
}

export const executionGateway = new ExecutionGateway()
