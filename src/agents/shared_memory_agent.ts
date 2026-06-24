import { BaseAgent } from './base_agent';

export class SharedMemoryAgent extends BaseAgent {
    private memorySpace: Record<string, any> = {};

    constructor(id: string) {
        super(id, 'SHARED_MEM');
    }

    public async decide(task: { op: 'WRITE' | 'READ'; key: string; value?: any }): Promise<void> {
        if (task.op === 'WRITE') {
            this.memorySpace[task.key] = task.value;
            this.log(`MEM: Written to ${task.key}`);
        } else {
            this.log(`MEM: Accessed ${task.key}`);
        }
    }
}
