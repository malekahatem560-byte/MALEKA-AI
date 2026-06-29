"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
const parallel_scheduler_1 = require("./parallel_scheduler");
async function runMasterSync() {
    const engine = new engine_1.KernelEngine('./data_master');
    await engine.boot();
    const scheduler = new parallel_scheduler_1.ParallelScheduler(engine);
    const tasks = Array.from({ length: 100 }, (_, i) => ({
        data: new Uint8Array([i]),
        seq: BigInt(i)
    }));
    await scheduler.batchWrite(tasks);
    console.log("[System] Master Sync: All cores synchronized.");
}
runMasterSync().catch(console.error);
