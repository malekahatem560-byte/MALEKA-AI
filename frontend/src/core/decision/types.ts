export type DecisionInput = {
  input: any
  timestamp: number
}

export type AgentDecision = {
  agent: string
  confidence: number
  output: any
}

export type FinalDecision = {
  selected: AgentDecision
  all: AgentDecision[]
  score: number
}
