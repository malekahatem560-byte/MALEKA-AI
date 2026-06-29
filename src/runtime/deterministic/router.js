"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeterministicRouter = void 0;
const planner_1 = require("./planner");
class DeterministicRouter {
    registry;
    workerPool;
    bus;
    constructor(registry, workerPool, bus) {
        this.registry = registry;
        this.workerPool = workerPool;
        this.bus = bus;
    }
    planner = new planner_1.ExecutionPlanner();
    async dispatch(req) {
        const plan = this.planner.plan(req);
        switch (plan.mode) {
            case 'sync':
                return this.registry.dispatch(req.agentId, req.payload);
            case 'worker':
                return this.workerPool.execute(req);
            case 'event':
                this.bus.emit('dispatch', req);
                return;
            default:
                throw new Error('Invalid execution mode');
        }
    }
}
exports.DeterministicRouter = DeterministicRouter;
