import { AgentTask } from './agent_types';
import { AgentRegistry } from '../agents/agent_registry';

export class AgentExecutionEngine {
    private queue: AgentTask[] = [];

    constructor(private registry: AgentRegistry) {}

    public async schedule(task: AgentTask): Promise<void> {
        this.queue.push(task);
        this.queue.sort((a, b) => b.priority - a.priority);
        await this.processNext();
    }

    private async processNext(): Promise<void> {
        const task = this.queue.shift();
        if (!task) return;

        try {
            await this.registry.dispatch(task.agentId, task.payload);
        } catch (e) {
            if (task.retries > 0) {
                task.retries--;
                this.schedule(task);
            }
        }
    }
}
