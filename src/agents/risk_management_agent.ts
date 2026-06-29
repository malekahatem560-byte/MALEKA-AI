import { BaseAgent } from './base_agent';

export class RiskManagementAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'RISK_MGMT');
    }

    public async decide(task: {
        componentId: string;
        failureProbability: number;
    }): Promise<void> {

        if (!task) {
            this.log('Invalid task payload');
            return;
        }

        if (task.failureProbability > 0.5) {
            this.log(
                `RISK: HIGH RISK detected for ${task.componentId}`
            );
        } else {
            this.log(
                `RISK: ${task.componentId} operating within safety parameters.`
            );
        }
    }
}
