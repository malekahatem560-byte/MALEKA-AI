import { EventBus } from '../core/event_bus';
import { PermissionManager } from '../security/permission_manager';
import { SystemOrchestrator } from '../agents/system_orchestrator';

export class AgentDispatcher {
    constructor(
        private bus: EventBus,
        private orchestrator: SystemOrchestrator,
        private security: PermissionManager
    ) {}

    public async dispatch(
        agentId: string,
        payload: any
    ): Promise<void> {

        if (!this.security.hasPermission(agentId, 'EXECUTE')) {
            console.error(
                `[SECURITY] Agent ${agentId} lacks EXECUTE permission.`
            );
            return;
        }

        await this.orchestrator.registry.dispatch(
            agentId,
            payload
        );
    }
}
