"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigAgent = void 0;
const base_agent_1 = require("./base_agent");
class ConfigAgent extends base_agent_1.BaseAgent {
    config = new Map();
    constructor(id) {
        super(id, 'CONFIG');
    }
    async decide(task) {
        const key = task?.key ?? 'runtime.load';
        const value = task?.value ?? task?.load ?? 0;
        this.config.set(key, value);
        this.log(`CONFIG: Updated parameter [${key}] to [${value}]`);
    }
    getConfig(key) {
        return this.config.get(key);
    }
}
exports.ConfigAgent = ConfigAgent;
