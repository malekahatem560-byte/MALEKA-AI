import { BaseAgent } from './base_agent';

export class ObserverAgent extends BaseAgent {

    constructor(id: string) {
        super(id, 'OBSERVER');
    }

    public async decide(
        data: { load: number }
    ): Promise<void> {

        this.log(
            `Observer Tick | load=${data.load}`
        );

        if (data.load > 80) {
            this.log(
                "CRITICAL: High load detected!"
            );
        }
    }
}
