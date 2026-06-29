import { BaseAgent } from './base_agent';

export class AssistantAgent extends BaseAgent {
  constructor(id: string) {
    super(id, 'ASSISTANT');
  }

  public async decide(task: any): Promise<void> {
    if (!task) {
      this.log('Invalid task payload');
      return;
    }

    this.log(`ASSISTANT: Runtime heartbeat=${task.heartbeat}`);
    this.log('ASSISTANT: Intent mapped to internal system command.');
  }
}
