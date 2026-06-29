import { agentRegistry } from "../agents/registry"
import type { AgentTask } from "../agents/types"

export async function runAgentPipeline(input: any) {
  const tasks: AgentTask[] = [
    {
      id: crypto.randomUUID(),
      type: "ANALYZE",
      payload: input,
    },
    {
      id: crypto.randomUUID(),
      type: "PROCESS",
      payload: input,
    },
    {
      id: crypto.randomUUID(),
      type: "DECIDE",
      payload: input,
    },
  ]

  return agentRegistry.executeAll(tasks)
}
