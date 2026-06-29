import { BaseAgent } from './base_agent';

export class DashboardAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'DASHBOARD');
    }

    public async decide(task: any): Promise<void> {

        const state =
            task?.systemState ??
            task ??
            {};

        const cpu =
            state.cpuPercent ??
            state.load ??
            state.cpuUsage ??
            0;

        const ram =
            state.memoryPercent ??
            0;

        this.log(
            `CPU=${cpu}% RAM=${ram}%`
        );
    }
}
