import { CognitiveEngine } from './cognitive_engine';
import { KnowledgeStore } from './knowledge_store';
import { MemoryRecord } from './types';

import {
GlobalCognitiveRuntime
} from './global_cognitive_runtime';

export class PersistentCognitiveMemory {

constructor(
private readonly cognition: CognitiveEngine,
private readonly knowledge: KnowledgeStore
) {}

public async remember(
content: string
): Promise<void> {

const record: MemoryRecord = {
id: `mem_${Date.now()}`,
timestamp: Date.now(),
content
};

await this.knowledge.store(
record
);

try {

await GlobalCognitiveRuntime
.vectors()
.store(
record,
content
);

} catch {

}

}

public async rememberMany(
contents: string[]
): Promise<void> {

for (const content of contents) {

await this.remember(
content
);

}

}

public recall(
query: string
) {

return this.cognition.recall(
query
);

}

public async semanticRecall(
query: string
): Promise<MemoryRecord[]> {

const retriever =
this.cognition.semanticRetriever;

if (!retriever) {
return [];
}

return await retriever.search(
query
);

}

public count(): number {

return this.cognition.memoryCount();

}

}
