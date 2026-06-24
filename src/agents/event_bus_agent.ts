import { BaseAgent } from './base_agent';

export class EventBusAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'EVENT_BUS');
    }

    public async decide(event: { type: string; payload: any }): Promise<void> {
        this.log(`EVENT_BUS: Routing event [${event.type}] with payload size: ${JSON.stringify(event.payload).length} bytes`);
    }
}
