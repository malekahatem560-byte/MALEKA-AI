import { memoryGraph } from "../memory/memoryGraph"

import type { AgentTask, AgentResult } from "./types"

export class AgentEngine {
  async run(task: AgentTask): Promise<AgentResult> {

    memoryGraph.add({
      id: task.id,
      type: "command",
      data: task,
    })

    const output = {
      analyzed: true,
      processed: task.payload,
      decision: "OK"
    }

    memoryGraph.add({
      id: task.id + "-result",
      type: "event",
      data: output,
    })

    return {
      id: task.id,
      success: true,
      data: output
    }
  }
}

export const agentEngine = new AgentEngine()
