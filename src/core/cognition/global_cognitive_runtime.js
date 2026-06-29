"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCognitiveRuntime = void 0;
const cognitive_engine_1 = require("./cognitive_engine");
const knowledge_store_1 = require("./knowledge_store");
const persistent_cognitive_memory_1 = require("./persistent_cognitive_memory");
const embedding_service_1 = require("../vector/embedding_service");
const vector_store_1 = require("../vector/vector_store");
const semantic_retriever_1 = require("./semantic_retriever");
const recovery_bridge_1 = require("./recovery_bridge");
class GlobalCognitiveRuntime {
    static cognitive = null;
    static persistent = null;
    static embedding = null;
    static vectorStore = null;
    static initialize(memoryManager) {
        if (this.cognitive &&
            this.persistent) {
            return;
        }
        this.embedding =
            new embedding_service_1.EmbeddingService();
        this.vectorStore =
            new vector_store_1.VectorStore(this.embedding);
        this.cognitive =
            new cognitive_engine_1.CognitiveEngine();
        this.cognitive.semanticRetriever =
            new semantic_retriever_1.SemanticRetriever(this.vectorStore);
        const knowledge = new knowledge_store_1.KnowledgeStore(memoryManager, recovery_bridge_1.GlobalEpisodicMemory);
        this.persistent =
            new persistent_cognitive_memory_1.PersistentCognitiveMemory(this.cognitive, knowledge);
    }
    static cognition() {
        if (!this.cognitive) {
            throw new Error('Cognitive runtime not initialized');
        }
        return this.cognitive;
    }
    static memory() {
        if (!this.persistent) {
            throw new Error('Cognitive runtime not initialized');
        }
        return this.persistent;
    }
    static vectors() {
        if (!this.vectorStore) {
            throw new Error('Cognitive runtime not initialized');
        }
        return this.vectorStore;
    }
}
exports.GlobalCognitiveRuntime = GlobalCognitiveRuntime;
