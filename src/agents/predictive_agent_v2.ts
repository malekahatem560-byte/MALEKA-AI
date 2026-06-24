import { BaseAgent } from './base_agent';

export class PredictiveAgentV2 extends BaseAgent {
    constructor(id: string) {
        super(id, 'PREDICTIVE_V2');
    }

    public async decide(task: { history: number[] }): Promise<void> {
        const avg = task.history.reduce((a, b) => a + b, 0) / task.history.length;
        this.log(`PREDICTIVE_V2: Analyzing trends. Projected load trend: ${avg > 70 ? 'CRITICAL_SPIKE' : 'STABLE'}`);
    }
}
