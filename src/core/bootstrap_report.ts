import { AgentRegistry } from '../agents/agent_registry';
import { EventBus } from './event_bus';

export class BootstrapReport {
  public static print(registry: AgentRegistry, bus: EventBus): void {
    console.log('========================================');
    console.log('MALEKA BOOT REPORT');
    console.log('========================================');
    console.log(`Agents Registered : ${registry.count()}`);
    console.log(`Agent IDs         : ${registry.getAgentIds().join(', ')}`);
    console.log(`Event Bus Active  : ${bus ? 'YES' : 'NO'}`);
    console.log(`Timestamp         : ${Date.now()}`);
    console.log('========================================');
  }
}
