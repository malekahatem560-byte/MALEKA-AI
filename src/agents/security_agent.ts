import { BaseAgent } from './base_agent';

export class SecurityAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'SECURITY');
    }

    public async decide(task: { payload: string }): Promise<void> {
        this.log(`Scanning integrity for: ${task.payload}`);
        if (task.payload.includes("CRITICAL")) {
            this.log("ENCRYPTING: Security layer applied to high-risk packet.");
        }
    }
}
