import { BaseAgent } from './base_agent';

export class ProtocolAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'PROTO_STD');
    }

    public async decide(event: any): Promise<void> {
        this.log(
            `PROTO: Validating runtime payload at ${event?.timestamp ?? Date.now()}`
        );
    }
}
