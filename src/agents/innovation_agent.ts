import { BaseAgent } from './base_agent';

export class InnovationAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'INNOVATION');
    }

    public async decide(task: {
        metrics: {
            timestamp: number;
            heartbeat: boolean;
            load: number;
        };
    }): Promise<void> {

        if (!task) {
            this.log('Invalid task payload');
            return;
        }

        this.log(
            `INNOVATION: Runtime load=${task.metrics.load}`
        );

        if (task.metrics.load < 50) {
            this.log(
                'INNOVATION: Auto-Optimization opportunity detected.'
            );
        }
    }
}
