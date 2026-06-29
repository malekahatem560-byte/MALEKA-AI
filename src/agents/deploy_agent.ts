import { BaseAgent } from './base_agent';

export class DeployAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'DEPLOY');
    }

    public async decide(task: any): Promise<void> {

        const version = task?.version ?? 'runtime';
        const status = task?.status ?? 'ACTIVE';

        this.log(
            `DEPLOY: Initiating hot-swap for version: ${version}`
        );

        this.log(
            `DEPLOY: Deployment status: ${status}`
        );
    }
}
