import { agentRegistry } from "./registry"

export function registerDefaultAgents() {

  agentRegistry.register("ANALYZE", async (task) => {
    return {
      id: task.id,
      success: true,
      data: {
        analysis: true,
        payload: task.payload,
      },
    }
  })

  agentRegistry.register("PROCESS", async (task) => {
    return {
      id: task.id,
      success: true,
      data: {
        processed: true,
        payload: task.payload,
      },
    }
  })

  agentRegistry.register("DECIDE", async (task) => {
    return {
      id: task.id,
      success: true,
      data: {
        decision: "approved",
        payload: task.payload,
      },
    }
  })
}
