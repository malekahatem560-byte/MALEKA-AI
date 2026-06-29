import { BaseAgent } from './base_agent';

export class AgentRegistry {

private agents: Map<string, BaseAgent> = new Map();

public register(agent: BaseAgent): void {
    this.agents.set(agent.id, agent);
}

public async dispatch(
    id: string,
    task: any
): Promise<void> {

    const agent = this.agents.get(id);

    if (agent) {
        await agent.decide(task);
    }
}

public getAgentIds(): string[] {
    return Array.from(this.agents.keys());
}

public count(): number {
    return this.agents.size;
}

public exists(id: string): boolean {
    return this.agents.has(id);
}

public get(id: string): BaseAgent | undefined {
    return this.agents.get(id);
}

}
