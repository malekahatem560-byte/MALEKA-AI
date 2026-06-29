"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationAgent = void 0;
const base_agent_1 = require("./base_agent");
class SimulationAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'SIMULATION');
    }
    async decide(task) {
        this.log(`SIM: Running scenario [${task.scenario}] at intensity ${task.intensity}%`);
        // منطق محاكاة الحمل
    }
}
exports.SimulationAgent = SimulationAgent;
