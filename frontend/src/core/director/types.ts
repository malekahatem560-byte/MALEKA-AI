import type { AgentResult } from "../agents/types"

export interface PlanStep {
  id: string
  agent: string
  action: string
  payload: unknown
}

export interface ExecutionPlan {
  id: string
  original: unknown
  steps: PlanStep[]
}

export interface PlanResult {
  success: boolean
  plan: ExecutionPlan
  results: AgentResult[]
}
