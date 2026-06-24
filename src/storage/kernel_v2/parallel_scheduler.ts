import { KernelEngine } from './engine';
import { Dashboard } from './dashboard';

export class ParallelScheduler {
    constructor(private readonly engine: KernelEngine) {}

    public async batchWrite(tasks: { data: Uint8Array, seq: bigint }[]): Promise<void> {
        let completed = 0;
        const start = Date.now();
        
        await Promise.all(tasks.map(async (t) => {
            await this.engine.execute(t.data, t.seq);
            completed++;
            Dashboard.render({ ops: completed, throughput: Math.floor(completed / (Date.now() - start + 1)) });
        }));
    }
}
