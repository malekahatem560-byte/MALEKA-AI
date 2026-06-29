"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederatedLearningAgent = void 0;
const base_agent_1 = require("./base_agent");
class FederatedLearningAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'FED_LEARN');
    }
    async decide(task) {
        if (!task) {
            this.log('Invalid task payload');
            return;
        }
        this.log(`FED: Aggregating runtime metrics load=${task.localGradients.load}`);
    }
}
exports.FederatedLearningAgent = FederatedLearningAgent;
