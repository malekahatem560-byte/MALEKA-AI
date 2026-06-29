import { eventBus } from "../events/eventBus"
import { runAgentPipeline } from "../runtime/runtime"

class MalekaOrchestrator {
  async execute(input: unknown) {
    const ts = Date.now()

    // eventBus.emit (telemetry only)("ORCH.INPUT", {
      input,
      timestamp: ts,
    })

    const context = {
      input,
      timestamp: ts,
    }

    const result = await runAgentPipeline(context)

    // eventBus.emit (telemetry only)("ORCH.RESULT", {
      result,
    })

    return result
  }
}

export const MALEKA_ORCHESTRATOR = new MalekaOrchestrator()
