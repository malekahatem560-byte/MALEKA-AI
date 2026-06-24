import { BaseAgent } from './base_agent';

export class IDSAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'IDS');
    }

    public async decide(task: { source: string; pattern: string }): Promise<void> {
        const isMalicious = task.pattern.includes('SQL_INJECTION') || task.pattern.includes('DDoS');
        if (isMalicious) {
            this.log(`IDS: ALERT! Malicious activity detected from [${task.source}]. Isolating...`);
        } else {
            this.log(`IDS: Traffic from [${task.source}] verified as safe.`);
        }
    }
}
