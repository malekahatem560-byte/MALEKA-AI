import type { AgentDecision, FinalDecision } from "../decision/types"

class VotingEngine {

  evaluate(decisions: AgentDecision[]): FinalDecision {

    const safe = decisions.filter(Boolean)

    const sorted = [...safe].sort(
      (a, b) => (b.confidence ?? 0) - (a.confidence ?? 0)
    )

    const selected = sorted[0]

    const avg =
      safe.reduce((acc, d) => acc + (d.confidence ?? 0), 0) / safe.length

    return {
      selected,
      all: safe,
      score: avg
    }
  }
}

export const votingEngine = new VotingEngine()
