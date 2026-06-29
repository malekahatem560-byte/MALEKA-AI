"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheAgent = void 0;
const base_agent_1 = require("./base_agent");
class CacheAgent extends base_agent_1.BaseAgent {
    cache = new Map();
    constructor(id) {
        super(id, 'CACHE');
    }
    async decide(task) {
        if (Object.prototype.hasOwnProperty.call(task, 'value')) {
            this.cache.set(task.key, task.value);
            this.log(`CACHE: Stored value for key: ${task.key}`);
            return;
        }
        const val = this.cache.get(task.key);
        this.log(`CACHE: Accessed key: ${task.key} - Found: ${val !== undefined}`);
    }
}
exports.CacheAgent = CacheAgent;
