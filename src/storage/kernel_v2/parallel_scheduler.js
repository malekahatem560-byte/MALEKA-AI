"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParallelScheduler = void 0;
const dashboard_1 = require("./dashboard");
class ParallelScheduler {
    engine;
    constructor(engine) {
        this.engine = engine;
    }
    async batchWrite(tasks) {
        let completed = 0;
        const start = Date.now();
        await Promise.all(tasks.map(async (t) => {
            await this.engine.execute(t.data, t.seq);
            completed++;
            dashboard_1.Dashboard.render({ ops: completed, throughput: Math.floor(completed / (Date.now() - start + 1)) });
        }));
    }
}
exports.ParallelScheduler = ParallelScheduler;
