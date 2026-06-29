import { BaseAgent } from './base_agent';

export class PredictiveAgentV2 extends BaseAgent {
    constructor(id: string) {
        super(id, 'PREDICTIVE_V2');
    }

    private history: number[] = [];

    public async decide(task: any): Promise<void> {

        const load =
            typeof task?.load === 'number'
                ? task.load
                : 0;

        this.history.push(load);

        if (this.history.length > 50) {
            this.history.shift();
        }

        const avg =
            this.history.reduce((a, b) => a + b, 0) /
            this.history.length;

        this.log(
            `PREDICTIVE_V2: Trend=${avg > 70 ? 'CRITICAL_SPIKE' : 'STABLE'} | AvgLoad=${avg.toFixed(2)}`
        );
    }
}
