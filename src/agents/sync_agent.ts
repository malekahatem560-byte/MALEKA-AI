import { BaseAgent } from './base_agent';

export class SyncAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'SYNC');
    }

    public async decide(status: { timestamp: number; activeAgents: string[] }): Promise<void> {
        this.log(`Synchronizing state at ${status.timestamp}`);
        this.log(`Active coordination points: ${status.activeAgents.join(', ')}`);
    }
}
