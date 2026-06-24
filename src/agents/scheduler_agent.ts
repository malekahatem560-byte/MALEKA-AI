import { BaseAgent } from './base_agent';

export class SchedulerAgent extends BaseAgent {
    constructor(id: string) {
        super(id, 'SCHEDULER');
    }

    public async decide(task: { taskName: string; priority: number }): Promise<void> {
        this.log(`SCHEDULER: Queuing task [${task.taskName}] with priority [${task.priority}].`);
        // منطق جدولة المهام حسب الأولوية
    }
}
