"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntelligenceAgent = void 0;
const base_agent_1 = require("./base_agent");
const global_cognitive_runtime_1 = require("../core/cognition/global_cognitive_runtime");
class IntelligenceAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'INTELLIGENCE');
    }
    async decide(metrics) {
        const cognition = global_cognitive_runtime_1.GlobalCognitiveRuntime.cognition();
        const memory = global_cognitive_runtime_1.GlobalCognitiveRuntime.memory();
        const serialized = JSON.stringify(metrics);
        const context = cognition.contextBuilder.build('runtime', serialized);
        cognition.working.add(context);
        const memories = await memory.recall('runtime');
        const semanticMemories = await memory.semanticRecall(serialized);
        const mergedMemories = [
            ...memories,
            ...semanticMemories
        ];
        const result = await cognition.reasoning.reason(context, mergedMemories);
        const reflection = cognition.reflection.reflect(mergedMemories);
        const reflectionScore = cognition.reflection.score(mergedMemories);
        const insight = cognition.learning.learn(mergedMemories, reflectionScore);
        await memory.remember(serialized);
        this.log(`INTEL: confidence=${result.confidence}`);
        this.log(`INTEL: episodic_memories=${memories.length}`);
        this.log(`INTEL: semantic_memories=${semanticMemories.length}`);
        this.log(`INTEL: total_memories=${mergedMemories.length}`);
        this.log(`INTEL: memory_bank=${memory.count()}`);
        this.log(`INTEL: reflection_score=${reflectionScore}`);
        this.log(`INTEL: reflection=${reflection}`);
        this.log(`INTEL: insight_score=${insight.score}`);
        this.log(`INTEL: insights=${cognition.insightCount()}`);
        this.log(`INTEL: conclusion=${result.conclusion}`);
    }
}
exports.IntelligenceAgent = IntelligenceAgent;
