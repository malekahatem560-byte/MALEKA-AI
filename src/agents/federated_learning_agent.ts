import { BaseAgent } from './base_agent';

export class FederatedLearningAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'FED_LEARN');
    }

    public async decide(task: {
        modelId: string;
        localGradients: {
            load: number;
        };
    }): Promise<void> {

        if (!task) {
            this.log('Invalid task payload');
            return;
        }

        this.log(
            `FED: Aggregating runtime metrics load=${task.localGradients.load}`
        );
    }
}
