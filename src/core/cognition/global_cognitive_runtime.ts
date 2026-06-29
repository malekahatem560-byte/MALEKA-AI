import { CognitiveEngine } from './cognitive_engine';
import { KnowledgeStore } from './knowledge_store';
import { PersistentCognitiveMemory } from './persistent_cognitive_memory';

import { MemoryManager } from '../memory/memory_manager';

import { EmbeddingService } from '../vector/embedding_service';
import { VectorStore } from '../vector/vector_store';

import { SemanticRetriever } from './semantic_retriever';

import {
GlobalEpisodicMemory
} from './recovery_bridge';

export class GlobalCognitiveRuntime {

private static cognitive:
CognitiveEngine | null = null;

private static persistent:
PersistentCognitiveMemory | null = null;

private static embedding:
EmbeddingService | null = null;

private static vectorStore:
VectorStore | null = null;

public static initialize(
memoryManager: MemoryManager
): void {

if (
this.cognitive &&
this.persistent
) {
return;
}

this.embedding =
new EmbeddingService();

this.vectorStore =
new VectorStore(
this.embedding
);

this.cognitive =
new CognitiveEngine();

this.cognitive.semanticRetriever =
new SemanticRetriever(
this.vectorStore
);

const knowledge =
new KnowledgeStore(
memoryManager,
GlobalEpisodicMemory
);

this.persistent =
new PersistentCognitiveMemory(
this.cognitive,
knowledge
);

}

public static cognition():
CognitiveEngine {

if (!this.cognitive) {
throw new Error(
'Cognitive runtime not initialized'
);
}

return this.cognitive;

}

public static memory():
PersistentCognitiveMemory {

if (!this.persistent) {
throw new Error(
'Cognitive runtime not initialized'
);
}

return this.persistent;

}

public static vectors():
VectorStore {

if (!this.vectorStore) {
throw new Error(
'Cognitive runtime not initialized'
);
}

return this.vectorStore;

}

}
