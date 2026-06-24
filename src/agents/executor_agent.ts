import { BaseAgent } from './base_agent';
import { StorageKernelV2 } from '../storage/kernel_v2/storage_kernel_v2';
export class ExecutorAgent extends BaseAgent {
    constructor(id: string, private kernel: StorageKernelV2) { super(id, 'EXECUTOR'); }
    public async decide(task: { data: Uint8Array, seq: bigint }): Promise<void> {
        await this.kernel.store(task.data, task.seq);
        this.log(`Sequence ${task.seq} stored.`);
    }
}
