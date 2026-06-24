import { BaseAgent } from './base_agent';

export class EcoAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'ECO_MODE');
    }

    public async decide(task: { powerConsumption: number }): Promise<void> {
        if (task.powerConsumption > 500) {
            this.log("ECO: High power usage. Throttling non-essential background tasks.");
        } else {
            this.log("ECO: Power consumption within optimal green parameters.");
        }
    }
}
