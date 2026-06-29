import { BaseAgent } from './base_agent';

export class EventBusAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'EVENT_BUS');
    }

    public async decide(event: any): Promise<void> {

        const eventType =
            event?.type ??
            'RUNTIME_TICK';

        const payload =
            event?.payload ??
            event;

        const payloadSize =
            JSON.stringify(payload ?? {}).length;

        this.log(
            `EVENT_BUS: Routing event [${eventType}] with payload size: ${payloadSize} bytes`
        );
    }
}
