import { KernelEngine } from './engine';
import { ParallelScheduler } from './parallel_scheduler';

async function runMasterSync() {
    const engine = new KernelEngine('./data_master');
    await engine.boot();
    const scheduler = new ParallelScheduler(engine);

    const tasks = Array.from({ length: 100 }, (_, i) => ({
        data: new Uint8Array([i]),
        seq: BigInt(i)
    }));

    await scheduler.batchWrite(tasks);
    console.log("[System] Master Sync: All cores synchronized.");
}
runMasterSync().catch(console.error);
