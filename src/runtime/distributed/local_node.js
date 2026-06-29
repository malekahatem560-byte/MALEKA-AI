"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalExecutionNode = void 0;
const worker_pool_1 = require("../sandbox/worker_pool");
class LocalExecutionNode {
    pool;
    constructor() {
        this.pool = new worker_pool_1.WorkerPool(4);
    }
    async execute(agentId, payload) {
        return this.pool.run(agentId, payload);
    }
}
exports.LocalExecutionNode = LocalExecutionNode;
