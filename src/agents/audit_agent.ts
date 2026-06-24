import { BaseAgent } from './base_agent';

export class AuditAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'AUDIT');
    }

    public async decide(event: { action: string; agentId: string; status: string }): Promise<void> {
        this.log(`AUDIT_LOG: [${event.action}] by [${event.agentId}] - Status: ${event.status}`);
    }
}
