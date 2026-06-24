import { BaseAgent } from './base_agent';

export class ExceptionAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'EXCEPTION');
    }

    public async decide(task: { error: string; severity: 'LOW' | 'CRITICAL' }): Promise<void> {
        this.log(`EXCEPTION: Caught error [${task.error}] with severity [${task.severity}]`);
        if (task.severity === 'CRITICAL') {
            this.log("EXCEPTION: Triggering emergency recovery protocol.");
        }
    }
}
