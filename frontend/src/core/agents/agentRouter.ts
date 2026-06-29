import { agentRegistry } from "./registry"

export async function runAgentPipeline(task: any) {
  return agentRegistry.executeAll([
    { id: "1", type: "ANALYZE", payload: task },
    { id: "1", type: "PROCESS", payload: task },
    { id: "1", type: "DECIDE", payload: task },
  ])
}
