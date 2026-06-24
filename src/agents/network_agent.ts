import { BaseAgent } from './base_agent';

export class NetworkAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'NETWORK');
    }

    public async decide(task: { endpoint: string; data: Buffer }): Promise<void> {
        this.log(`NETWORK_IO: Transmitting to ${task.endpoint} - Size: ${task.data.length} bytes`);
    }
}
