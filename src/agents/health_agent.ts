import { BaseAgent } from './base_agent';

export class HealthAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'HEALTH');
    }

    public async decide(task: { targetAgent: string }): Promise<void> {
        this.log(`HEALTH_CHECK: Pinging agent ${task.targetAgent}...`);
        this.log(`HEALTH_CHECK: Agent ${task.targetAgent} is RESPONSIVE.`);
    }
}
