import { ExecutionRouter } from './execution_router';
import { EventBus } from '../core/event_bus';
import { SystemOrchestrator } from '../agents/system_orchestrator';
import { PermissionManager } from '../security/permission_manager';

export class AgentDispatcher {

  private bus: EventBus;
  private orchestrator: SystemOrchestrator;
  private permissions: PermissionManager;

  constructor(
    bus: EventBus,
    orchestrator: SystemOrchestrator,
    permissions: PermissionManager
  ) {
    this.bus = bus;
    this.orchestrator = orchestrator;
    this.permissions = permissions;
  }

  public async dispatch(agentId: string, payload: any): Promise<any> {
    // نقطة مركزية لاحقاً للـ policy / routing / telemetry
    return await ExecutionRouter.dispatch({
      agentId,
      payload
    });
  }
}
