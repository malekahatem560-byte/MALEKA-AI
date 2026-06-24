import { BaseAgent } from './base_agent';

export class ResourceAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'RESOURCE');
    }

    public async decide(task: { agentId: string; cpuUsage: number; ramUsage: number }): Promise<void> {
        this.log(`RESOURCE: Monitoring ${task.agentId} - CPU: ${task.cpuUsage}%, RAM: ${task.ramUsage}MB`);
        if (task.cpuUsage > 80) {
            this.log(`ALERT: High pressure on ${task.agentId}. Scaling resources.`);
        }
    }
}
