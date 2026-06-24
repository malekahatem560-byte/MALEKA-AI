import { BaseAgent } from './base_agent';

export class ConfigAgent extends BaseAgent {
    private config: Map<string, any> = new Map();

    constructor(id: string) {
        super(id, 'CONFIG');
    }

    public async decide(task: { key: string; value: any }): Promise<void> {
        this.config.set(task.key, task.value);
        this.log(`CONFIG: Updated parameter [${task.key}] to [${task.value}]`);
    }

    public getConfig(key: string): any {
        return this.config.get(key);
    }
}
