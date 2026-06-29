import { BaseAgent } from './base_agent';

export class HealthAgent extends BaseAgent {
  constructor(id: string) {
    super(id, 'HEALTH');
  }

  public async decide(task: any): Promise<void> {
    if (!task) {
      this.log('Invalid task payload');
      return;
    }

    this.log(`HEALTH_CHECK: Pinging agent ${task.agentId}...`);
    this.log(`HEALTH_CHECK: Agent ${task.agentId} is RESPONSIVE.`);
  }
}
