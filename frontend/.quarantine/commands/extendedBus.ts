import { commandBus } from "./commandBus"
import { telemetry } from "../telemetry/stream"

export function installTelemetryBridge() {
  const originalExecute = commandBus.execute.bind(commandBus)

  commandBus.execute = async (cmd: any) => {
    telemetry.emit({
      type: "COMMAND.INCOMING",
      payload: cmd,
    })

    const result = await originalExecute(cmd)

    telemetry.emit({
      type: "COMMAND.RESULT",
      payload: { cmd, result },
    })

    return result
  }
}
