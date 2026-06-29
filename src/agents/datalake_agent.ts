import { BaseAgent } from './base_agent';

export class DataLakeAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'DATALAKE');
    }

    public async decide(task: any): Promise<void> {

        const dataId =
            task?.dataId ??
            `runtime-${Date.now()}`;

        this.log(
            `DATALAKE: Archiving dataset [${dataId}] to cold storage.`
        );
    }
}
