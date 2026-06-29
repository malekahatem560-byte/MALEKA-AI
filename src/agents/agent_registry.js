"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRegistry = void 0;
class AgentRegistry {
    agents = new Map();
    register(agent) {
        this.agents.set(agent.id, agent);
    }
    async dispatch(id, task) {
        const agent = this.agents.get(id);
        if (agent) {
            await agent.decide(task);
        }
    }
    getAgentIds() {
        return Array.from(this.agents.keys());
    }
    count() {
        return this.agents.size;
    }
    exists(id) {
        return this.agents.has(id);
    }
    get(id) {
        return this.agents.get(id);
    }
}
exports.AgentRegistry = AgentRegistry;
