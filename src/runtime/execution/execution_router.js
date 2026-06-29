"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionRouter = void 0;
const execution_contract_1 = require("./execution_contract");
class ExecutionRouter {
    registry;
    bus;
    workerPool;
    constructor(registry, bus, workerPool) {
        this.registry = registry;
        this.bus = bus;
        this.workerPool = workerPool;
    }
    async execute(req) {
        const task = execution_contract_1.ExecutionContract.normalize(req);
        switch (task.mode) {
            case 'sync':
                return this.registry.dispatch(task.agentId, task.payload);
            case 'event':
                this.bus.emit('dispatch', task);
                return;
            case 'worker':
                return this.workerPool.execute(task);
            default:
                throw new Error('Invalid dispatch mode');
        }
    }
}
exports.ExecutionRouter = ExecutionRouter;
