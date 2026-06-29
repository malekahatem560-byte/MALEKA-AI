import { WorkingMemory } from './working_memory';
import { Planner } from './planner';
import { ReasoningEngine } from './reasoning_engine';
import { ReflectionEngine } from './reflection_engine';
import { ContextBuilder } from './context_builder';
import { MemoryRetriever } from './memory_retriever';
import { SemanticRetriever } from './semantic_retriever';
import { LearningEngine } from './learning_engine';
import { MemoryRecord } from './types';

import {
GlobalEpisodicMemory
} from './recovery_bridge';

export class CognitiveEngine {

public readonly working =
new WorkingMemory();

public readonly episodic =
GlobalEpisodicMemory;

public readonly planner =
new Planner();

public readonly reasoning =
new ReasoningEngine();

public readonly reflection =
new ReflectionEngine();

public readonly learning =
new LearningEngine();

public readonly contextBuilder =
new ContextBuilder();

public readonly memoryRetriever =
new MemoryRetriever(
GlobalEpisodicMemory
);

public semanticRetriever:
SemanticRetriever | null = null;

public remember(
content: string
): void {

const record: MemoryRecord = {
id: `mem_${Date.now()}`,
timestamp: Date.now(),
content
};

this.episodic.add(record);

}

public async recall(
query: string
): Promise<MemoryRecord[]> {

return await this.memoryRetriever.retrieve(
query
);

}

public memoryCount(): number {
return this.episodic.count();
}

public insightCount(): number {
return this.learning.count();
}

}
