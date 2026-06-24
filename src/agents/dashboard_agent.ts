import { BaseAgent } from './base_agent';

export class DashboardAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'DASHBOARD');
    }

    public async decide(task: { systemState: any }): Promise<void> {
        this.log("DASHBOARD: Rendering system state...");
        console.table(task.systemState);
    }
}
