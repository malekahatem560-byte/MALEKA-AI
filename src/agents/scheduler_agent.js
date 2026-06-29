"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerAgent = void 0;
const base_agent_1 = require("./base_agent");
class SchedulerAgent extends base_agent_1.BaseAgent {
    constructor(id) {
        super(id, 'SCHEDULER');
    }
    async decide(task) {
        this.log(`SCHEDULER: Queuing task [${task.taskName}] with priority [${task.priority}].`);
        // منطق جدولة المهام حسب الأولوية
    }
}
exports.SchedulerAgent = SchedulerAgent;
