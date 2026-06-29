"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistentCognitiveMemory = void 0;
const global_cognitive_runtime_1 = require("./global_cognitive_runtime");
class PersistentCognitiveMemory {
    cognition;
    knowledge;
    constructor(cognition, knowledge) {
        this.cognition = cognition;
        this.knowledge = knowledge;
    }
    async remember(content) {
        const record = {
            id: `mem_${Date.now()}`,
            timestamp: Date.now(),
            content
        };
        await this.knowledge.store(record);
        try {
            await global_cognitive_runtime_1.GlobalCognitiveRuntime
                .vectors()
                .store(record, content);
        }
        catch {
        }
    }
    async rememberMany(contents) {
        for (const content of contents) {
            await this.remember(content);
        }
    }
    recall(query) {
        return this.cognition.recall(query);
    }
    async semanticRecall(query) {
        const retriever = this.cognition.semanticRetriever;
        if (!retriever) {
            return [];
        }
        return await retriever.search(query);
    }
    count() {
        return this.cognition.memoryCount();
    }
}
exports.PersistentCognitiveMemory = PersistentCognitiveMemory;
