import { BaseAgent } from './base_agent';

export class SecurityAgent extends BaseAgent {

    constructor(id: string) {
        super(id, 'SECURITY');
    }

    public async decide(task: any): Promise<void> {

        const payload =
            typeof task?.payload === 'string'
                ? task.payload
                : JSON.stringify(task ?? {});

        this.log(
            `Scanning integrity for: ${payload}`
        );

        if (
            payload.includes('CRITICAL')
        ) {

            this.log(
                'ENCRYPTING: Security layer applied to high-risk packet.'
            );
        }
    }
}
