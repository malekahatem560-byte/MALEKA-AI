import { BaseAgent } from './base_agent';

export class SyncAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'SYNC');
    }

    public async decide(status: any): Promise<void> {

        const timestamp =
            typeof status?.timestamp === 'number'
                ? status.timestamp
                : Date.now();

        const activeAgents =
            Array.isArray(status?.activeAgents)
                ? status.activeAgents
                : [];

        this.log(`Synchronizing state at ${timestamp}`);

        if (activeAgents.length > 0) {
            this.log(
                `Active coordination points: ${activeAgents.join(', ')}`
            );
        } else {
            this.log(
                'Active coordination points: none'
            );
        }
    }
}
