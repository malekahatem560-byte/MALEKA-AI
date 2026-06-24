import { BaseAgent } from './base_agent';

export class PerfMonitorAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'PERF_MON');
    }

    public async decide(task: { sender: string; receiver: string; latencyMs: number }): Promise<void> {
        if (task.latencyMs > 100) {
            this.log(`PERF: High latency detected between [${task.sender}] and [${task.receiver}]: ${task.latencyMs}ms`);
        } else {
            this.log(`PERF: Communication link [${task.sender}->${task.receiver}] is healthy.`);
        }
    }
}
