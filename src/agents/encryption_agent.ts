import { BaseAgent } from './base_agent';
import * as crypto from 'crypto';

export class EncryptionAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'ENCRYPTION');
    }

    public async decide(task: { data: string }): Promise<void> {
        const hash = crypto.createHash('sha256').update(task.data).digest('hex');
        this.log(`ENCRYPTION: Data secured. Hash: ${hash.substring(0, 16)}...`);
    }
}
