import { BaseAgent } from './base_agent';

export class SimulationAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'SIMULATION');
    }

    public async decide(task: { scenario: string; intensity: number }): Promise<void> {
        this.log(`SIM: Running scenario [${task.scenario}] at intensity ${task.intensity}%`);
        // منطق محاكاة الحمل
    }
}
