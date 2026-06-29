import { BaseAgent } from './base_agent';

export class ConfigAgent extends BaseAgent {

    private config: Map<string, any> = new Map();

    constructor(id: string) {
        super(id, 'CONFIG');
    }

    public async decide(task: any): Promise<void> {

        const key = task?.key ?? 'runtime.load';
        const value = task?.value ?? task?.load ?? 0;

        this.config.set(key, value);

        this.log(
            `CONFIG: Updated parameter [${key}] to [${value}]`
        );
    }

    public getConfig(key: string): any {
        return this.config.get(key);
    }
}
