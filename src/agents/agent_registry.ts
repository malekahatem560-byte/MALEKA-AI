import { BaseAgent } from './base_agent';
export class AgentRegistry {
    private agents: Map<string, BaseAgent> = new Map();
    public register(agent: BaseAgent): void { this.agents.set(agent.id, agent); }
    public async dispatch(id: string, task: any): Promise<void> {
        const agent = this.agents.get(id);
        if (agent) await agent.decide(task);
    }
}
