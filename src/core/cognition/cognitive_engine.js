"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitiveEngine = void 0;
const working_memory_1 = require("./working_memory");
const planner_1 = require("./planner");
const reasoning_engine_1 = require("./reasoning_engine");
const reflection_engine_1 = require("./reflection_engine");
const context_builder_1 = require("./context_builder");
const memory_retriever_1 = require("./memory_retriever");
const learning_engine_1 = require("./learning_engine");
const recovery_bridge_1 = require("./recovery_bridge");
class CognitiveEngine {
    working = new working_memory_1.WorkingMemory();
    episodic = recovery_bridge_1.GlobalEpisodicMemory;
    planner = new planner_1.Planner();
    reasoning = new reasoning_engine_1.ReasoningEngine();
    reflection = new reflection_engine_1.ReflectionEngine();
    learning = new learning_engine_1.LearningEngine();
    contextBuilder = new context_builder_1.ContextBuilder();
    memoryRetriever = new memory_retriever_1.MemoryRetriever(recovery_bridge_1.GlobalEpisodicMemory);
    semanticRetriever = null;
    remember(content) {
        const record = {
            id: `mem_${Date.now()}`,
            timestamp: Date.now(),
            content
        };
        this.episodic.add(record);
    }
    async recall(query) {
        return await this.memoryRetriever.retrieve(query);
    }
    memoryCount() {
        return this.episodic.count();
    }
    insightCount() {
        return this.learning.count();
    }
}
exports.CognitiveEngine = CognitiveEngine;
