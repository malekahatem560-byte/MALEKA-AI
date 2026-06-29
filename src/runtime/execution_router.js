"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionRouter = void 0;
class ExecutionRouter {
    static pool = null;
    static init(pool) {
        this.pool = pool;
    }
    /**
     * Single deterministic execution entry point
     */
    static async dispatch(task) {
        if (!this.pool) {
            throw new Error('[ExecutionRouter] WorkerPool not initialized');
        }
        return await this.pool.execute(task);
    }
}
exports.ExecutionRouter = ExecutionRouter;
