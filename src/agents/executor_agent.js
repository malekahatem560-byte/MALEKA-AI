"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutorAgent = void 0;
const base_agent_1 = require("./base_agent");
class ExecutorAgent extends base_agent_1.BaseAgent {
    kernel;
    constructor(id, kernel) {
        super(id, 'EXECUTOR');
        this.kernel = kernel;
    }
    async decide(task) {
        await this.kernel.store(task.data, task.seq);
        this.log(`Sequence ${task.seq} stored.`);
    }
}
exports.ExecutorAgent = ExecutorAgent;
