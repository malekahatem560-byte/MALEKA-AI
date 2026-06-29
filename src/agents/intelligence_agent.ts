import { BaseAgent } from './base_agent';

import {
GlobalCognitiveRuntime
} from '../core/cognition/global_cognitive_runtime';

export class IntelligenceAgent extends BaseAgent {

constructor(id: string) {
super(id, 'INTELLIGENCE');
}

public async decide(
metrics: any
): Promise<void> {

const cognition =
GlobalCognitiveRuntime.cognition();

const memory =
GlobalCognitiveRuntime.memory();

const serialized =
JSON.stringify(metrics);

const context =
cognition.contextBuilder.build(
'runtime',
serialized
);

cognition.working.add(
context
);

const memories =
await memory.recall(
'runtime'
);

const semanticMemories =
await memory.semanticRecall(
serialized
);

const mergedMemories = [
...memories,
...semanticMemories
];

const result =
await cognition.reasoning.reason(
context,
mergedMemories
);

const reflection =
cognition.reflection.reflect(
mergedMemories
);

const reflectionScore =
cognition.reflection.score(
mergedMemories
);

const insight =
cognition.learning.learn(
mergedMemories,
reflectionScore
);

await memory.remember(
serialized
);

this.log(
`INTEL: confidence=${result.confidence}`
);

this.log(
`INTEL: episodic_memories=${memories.length}`
);

this.log(
`INTEL: semantic_memories=${semanticMemories.length}`
);

this.log(
`INTEL: total_memories=${mergedMemories.length}`
);

this.log(
`INTEL: memory_bank=${memory.count()}`
);

this.log(
`INTEL: reflection_score=${reflectionScore}`
);

this.log(
`INTEL: reflection=${reflection}`
);

this.log(
`INTEL: insight_score=${insight.score}`
);

this.log(
`INTEL: insights=${cognition.insightCount()}`
);

this.log(
`INTEL: conclusion=${result.conclusion}`
);

}

}
