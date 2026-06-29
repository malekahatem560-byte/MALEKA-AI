import { agentRegistry } from "../agents/registry"

type DecisionInput = {
  id: string
  payload: any
}

export async function runDecision(input: DecisionInput) {
  const tasks = [
    { id: input.id, type: "ANALYZE", payload: input.payload },
    { id: input.id, type: "PROCESS", payload: input.payload },
    { id: input.id, type: "DECIDE", payload: input.payload },
  ]

  return await agentRegistry.executeAll(tasks)
}
