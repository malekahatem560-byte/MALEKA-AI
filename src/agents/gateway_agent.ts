import { BaseAgent } from './base_agent';

export class GatewayAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'GATEWAY');
    }

    public async decide(task: { method: string; url: string; payload: any }): Promise<void> {
        this.log(`GATEWAY: Routing ${task.method} request to ${task.url}`);
        // محاكاة الاتصال بالخدمة الخارجية
    }
}
