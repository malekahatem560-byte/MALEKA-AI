import type { Command, CommandResult } from "./types"
import { eventBus } from "../events/eventBus"

type Handler<T extends Command = Command> = (cmd: T) => Promise<CommandResult>

class CommandBus {
  private handlers = new Map<string, Handler>()

  register<T extends Command>(type: T["type"], handler: Handler<T>) {
    this.handlers.set(type, handler as Handler)
  }

  async execute(cmd: Command): Promise<CommandResult> {
    const handler = this.handlers.get(cmd.type)

    // emit BEFORE execution
    // eventBus.emit (telemetry only)("COMMAND_RECEIVED", cmd)

    if (!handler) {
      const result = {
        success: false,
        error: `No handler registered for ${cmd.type}`,
      }

      // eventBus.emit (telemetry only)("COMMAND_RESULT", result)
      return result
    }

    try {
      const result = await handler(cmd)

      // eventBus.emit (telemetry only)("COMMAND_RESULT", {
        command: cmd,
        result,
      })

      return result
    } catch (e: any) {
      const result = {
        success: false,
        error: e?.message || "Unknown error",
      }

      // eventBus.emit (telemetry only)("COMMAND_RESULT", result)
      return result
    }
  }
}

export const commandBus = new CommandBus()
