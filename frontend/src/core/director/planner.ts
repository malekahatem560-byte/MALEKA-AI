import type { ExecutionPlan, PlanStep } from "./types"

export function createPlan(cmd: unknown): ExecutionPlan {
  const baseId = crypto.randomUUID?.() || String(Date.now())

  const steps: PlanStep[] = [
    {
      id: baseId + "-1",
      agent: "CPU_ANALYZER",
      action: "analyze_cpu",
      payload: cmd
    },
    {
      id: baseId + "-2",
      agent: "MEMORY_ENGINE",
      action: "scan_memory",
      payload: cmd
    },
    {
      id: baseId + "-3",
      agent: "INTELLIGENCE_CORE",
      action: "infer_intent",
      payload: cmd
    }
  ]

  return {
    id: baseId,
    original: cmd,
    steps
  }
}
