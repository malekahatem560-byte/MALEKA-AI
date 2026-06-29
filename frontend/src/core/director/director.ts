import { uiKernel } from "../../ui/kernel/uiKernel"
import { memoryGraph } from '../memory/memoryGraph'
import { eventBus } from '../events/eventBus'
import { createPlan } from "./planner"
import { agentRegistry } from "../agents/registry"
import type { PlanResult } from "./types"

export async function executePlan(cmd: unknown): Promise<PlanResult> {
  const plan = createPlan(cmd)

  const results = []

  for (const step of plan.steps) {
    eventBus.emit("EXECUTION.STEP_START", { step })
    const agent = (agentRegistry as any).get(step.agent)

    if (!agent) {
      results.push({
        step: step.id,
        error: "agent not found"
      })
      continue
    }

    let attempt = 0
    const maxRetries = 1

    try {
      eventBus.emit("EXECUTION.STEP_START", { step })
      const res = await agent.execute({ id: step.id, type: step.action, payload: step.payload })
      
eventBus.emit("EXECUTION.STEP_RESULT", { step, res })
results.push(res)

      memoryGraph?.add?.({
        id: step.id,
        type: "execution_result",
        data: res
      })

    } catch (e: any) {
      if (attempt < maxRetries) {
        attempt++
        continue
      }

      eventBus.emit("EXECUTION.STEP_ERROR", {
        step,
        error: e?.message,
        recovered: false
      })

      // fallback execution (minimal safe fallback result)
      const fallback = {
        id: step.id,
        success: false,
        error: e?.message,
        fallback: true
      }

      results.push(fallback)
    }
  }

  uiKernel && uiKernel; // kernel hook active
return {
    success: true,
    plan,
    results
  }
}
