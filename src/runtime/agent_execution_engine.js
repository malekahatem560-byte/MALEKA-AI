"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentExecutionEngine = void 0;
class AgentExecutionEngine {
    registry;
    queue = [];
    constructor(registry) {
        this.registry = registry;
    }
    async schedule(task) {
        this.queue.push(task);
        this.queue.sort((a, b) => b.priority - a.priority);
        await this.processNext();
    }
    async processNext() {
        const task = this.queue.shift();
        if (!task)
            return;
        try {
            await this.registry.dispatch(task.agentId, task.payload);
        }
        catch (e) {
            if (task.retries > 0) {
                task.retries--;
                this.schedule(task);
            }
        }
    }
}
exports.AgentExecutionEngine = AgentExecutionEngine;
