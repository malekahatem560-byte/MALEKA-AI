import type { Command } from "../core/commands/types"
import { commandBus } from "../core/commands/commandBus"

export function executeCommand(cmd: Command) {
  return commandBus.execute(cmd)
}
