"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningEngine = void 0;
class LearningEngine {
    insights = [];
    learn(memories, reflectionScore) {
        const summary = memories.length > 0
            ? memories[memories.length - 1].content
            : 'NO_DATA';
        const insight = {
            id: `insight_${Date.now()}`,
            timestamp: Date.now(),
            score: reflectionScore,
            summary
        };
        this.insights.push(insight);
        return insight;
    }
    getInsights() {
        return [...this.insights];
    }
    count() {
        return this.insights.length;
    }
}
exports.LearningEngine = LearningEngine;
