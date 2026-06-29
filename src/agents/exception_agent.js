"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionAgent = void 0;
const base_agent_1 = require("./base_agent");
class ExceptionAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'EXCEPTION');
    }
    async decide(task) {
        this.log(`EXCEPTION: Caught error [${task.error}] with severity [${task.severity}]`);
        if (task.severity === 'CRITICAL') {
            this.log("EXCEPTION: Triggering emergency recovery protocol.");
        }
    }
}
exports.ExceptionAgent = ExceptionAgent;
