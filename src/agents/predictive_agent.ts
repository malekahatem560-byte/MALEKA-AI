import { BaseAgent } from './base_agent';

export class PredictiveAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'PREDICTIVE');
    }

    public async decide(history: { loads: number[] }): Promise<void> {
        const avg = history.loads.reduce((a, b) => a + b, 0) / history.loads.length;
        this.log(`Trend analysis: Average load projected at ${avg.toFixed(2)}%`);
        
        if (avg > 60) {
            this.log("PREDICTION: System load increasing. Pre-emptive scaling advised.");
        }
    }
}
