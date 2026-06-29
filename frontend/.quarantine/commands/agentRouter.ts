import { agentRegistry } from "../agents/registry"
import type { AgentTask } from "../agents/types"

export async function routeAgents(task: AgentTask) {
  return await agentRegistry.executeAll([
    {
      id: task.id,
      type: task.type,
      payload: task.payload,
    },
  ])
}
