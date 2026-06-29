"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedMemoryAgent = void 0;
const base_agent_1 = require("./base_agent");
class SharedMemoryAgent extends base_agent_1.BaseAgent {
    memorySpace = {};
    constructor(id) {
        super(id, 'SHARED_MEM');
    }
    async decide(task) {
        if (task.op === 'WRITE') {
            this.memorySpace[task.key] = task.value;
            this.log(`MEM: Written to ${task.key}`);
        }
        else {
            this.log(`MEM: Accessed ${task.key}`);
        }
    }
}
exports.SharedMemoryAgent = SharedMemoryAgent;
