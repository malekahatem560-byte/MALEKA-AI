import { BaseAgent } from './base_agent';

export class IntelligenceAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'INTELLIGENCE');
    }

    public async decide(metrics: { data: number[] }): Promise<void> {
        const volatility = Math.max(...metrics.data) - Math.min(...metrics.data);
        this.log(`INTEL: Pattern analysis complete. Volatility index: ${volatility.toFixed(2)}`);
    }
}
