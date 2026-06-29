import { BaseAgent } from './base_agent';

export class ResourceAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'RESOURCE');
    }

    public async decide(task: any): Promise<void> {

        const agentId = task?.agentId ?? 'RUNTIME';
        const cpuUsage = task?.cpuUsage ?? task?.load ?? 0;
        const ramUsage = task?.ramUsage ?? 0;

        this.log(
            `RESOURCE: Monitoring ${agentId} - CPU: ${cpuUsage}%, RAM: ${ramUsage}MB`
        );

        if (cpuUsage > 80) {
            this.log(
                `ALERT: High pressure on ${agentId}. Scaling resources.`
            );
        }
    }
}
