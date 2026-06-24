import { BaseAgent } from './base_agent';

export class AutoScalingAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'AUTOSCALING');
    }

    public async decide(task: { currentLoad: number; threshold: number }): Promise<void> {
        if (task.currentLoad > task.threshold) {
            this.log("AUTOSCALING: Load threshold exceeded. Provisioning new worker agents...");
        } else {
            this.log("AUTOSCALING: Load stable. Optimizing existing resources.");
        }
    }
}
