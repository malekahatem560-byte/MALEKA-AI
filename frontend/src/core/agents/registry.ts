import type { AgentTask, AgentResult } from "./types"

export type AgentHandler = (task: AgentTask) => Promise<AgentResult>

export interface Agent {
  id: string
  execute(task: AgentTask): Promise<AgentResult>
}

class AgentRegistry {
  private handlers = new Map<string, AgentHandler>()

  register(name: string, handler: AgentHandler): void
  register(agent: Agent): void
  register(a: string | Agent, b?: AgentHandler): void {
    if (typeof a === "string") {
      if (!b) throw new Error("Missing handler")
      this.handlers.set(a, b)
      return
    }

    this.handlers.set(a.id, (task) => a.execute(task))
  }

  get(id: string) {
    return this.handlers.get(id)
  }

  has(id: string) {
    return this.handlers.has(id)
  }

  async executeAll(tasks: AgentTask[]): Promise<AgentResult[]> {
    const results: AgentResult[] = []

    for (const task of tasks) {
      const handler = this.handlers.get(task.type)

      if (!handler) {
        results.push({
          id: task.id,
          success: false,
          data: { error: `Agent '${task.type}' not found` }
        })
        continue
      }

      results.push(await handler(task))
    }

    return results
  }

  list() {
    return [...this.handlers.keys()]
  }
}

export const agentRegistry = new AgentRegistry()
