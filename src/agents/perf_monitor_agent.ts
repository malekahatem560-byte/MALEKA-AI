import { BaseAgent } from './base_agent';

export class PerfMonitorAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'PERF_MON');
    }

    public async decide(task: {
        sourceAgent: string;
        targetAgent: string;
        latency: number;
    }): Promise<void> {

        if (!task) {
            this.log('Invalid task payload');
            return;
        }

        if (task.latency > 100) {
            this.log(
                `PERF: High latency detected between [${task.sourceAgent}] and [${task.targetAgent}] : ${task.latency}ms`
            );
        } else {
            this.log(
                `PERF: Communication link [${task.sourceAgent}->${task.targetAgent}] is healthy.`
            );
        }
    }
}
