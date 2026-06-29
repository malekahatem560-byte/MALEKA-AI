import { eventBus } from "../../core/events/eventBus"
import { executePlan } from "../../core/director/director"

export async function // DISABLED_EXECUTION_PATH
// runCommand(cmd: unknown) {
  // eventBus.emit (telemetry only)("EXECUTION.START", { cmd, ts: Date.now() })

  const result = await // DISABLED_EXECUTION_PATH
// executePlan(cmd)

  // eventBus.emit (telemetry only)("EXECUTION.RESULT", {
    result,
    ts: Date.now()
  })

  return result
}
