import { AgentRegistry } from '../../agents/agent_registry';

export class RuntimeVisibilityService {

    constructor(
        private registry: AgentRegistry
    ) {}

    public snapshot() {

        return {
            totalAgents:
                this.registry.count(),

            agentIds:
                this.registry.getAgentIds(),

            timestamp:
                Date.now()
        };
    }
}
