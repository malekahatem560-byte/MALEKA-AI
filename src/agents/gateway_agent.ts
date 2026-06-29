import { BaseAgent } from './base_agent';

export class GatewayAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'GATEWAY');
    }

    public async decide(task: any): Promise<void> {

        const method = task?.method ?? 'RUNTIME';
        const url = task?.url ?? '/heartbeat';

        this.log(
            `GATEWAY: Routing ${method} request to ${url}`
        );
    }
}
