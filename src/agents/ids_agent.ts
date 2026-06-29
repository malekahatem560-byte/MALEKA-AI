import { BaseAgent } from './base_agent';

export class IDSAgent extends BaseAgent {
constructor(id: string) {
super(id, 'IDS');
}

public async decide(task: any): Promise<void> {

    const source =
        task?.source ??
        'RUNTIME';

    const pattern =
        task?.pattern ??
        'HEARTBEAT';

    const isMalicious =
        pattern.includes('SQL_INJECTION') ||
        pattern.includes('DDoS');

    if (isMalicious) {
        this.log(
            `IDS: ALERT! Malicious activity detected from [${source}]. Isolating...`
        );
    } else {
        this.log(
            `IDS: Traffic from [${source}] verified as safe.`
        );
    }
}

}
