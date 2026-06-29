import { BaseAgent } from './base_agent';

export class CacheAgent extends BaseAgent {
    private cache: Map<string, any> = new Map();

    constructor(id: string) {
        super(id, 'CACHE');
    }

    public async decide(task: { key: string; value?: any }): Promise<void> {

        if (Object.prototype.hasOwnProperty.call(task, 'value')) {
            this.cache.set(task.key, task.value);

            this.log(
                `CACHE: Stored value for key: ${task.key}`
            );

            return;
        }

        const val = this.cache.get(task.key);

        this.log(
            `CACHE: Accessed key: ${task.key} - Found: ${val !== undefined}`
        );
    }
}
