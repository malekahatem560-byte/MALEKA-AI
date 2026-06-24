import { StorageKernelV2 } from '../storage/kernel_v2/storage_kernel_v2';
import { EventBus } from './event_bus';
import { RuntimeManager } from '../runtime/runtime_manager';
import { AgentDispatcher } from '../runtime/agent_dispatcher';
import { SystemOrchestrator } from '../agents/system_orchestrator';
import { HealthMonitor } from './monitoring/health_monitor';
import { PermissionManager } from '../security/permission_manager';

export class MalekaEngine {
    private runtime: RuntimeManager;
    private bus: EventBus;
    private dispatcher: AgentDispatcher;
    private orchestrator: SystemOrchestrator;
    private kernel: StorageKernelV2;
    private monitor: HealthMonitor;
    private permissions: PermissionManager;

    constructor() {
        this.bus = new EventBus();

        this.kernel =
            new StorageKernelV2('./storage_data');

        this.permissions = new PermissionManager();

        this.permissions.grant(
            'OBS_01',
            'EXECUTE'
        );

        this.permissions.grant(
            'EXEC_01',
            'EXECUTE'
        );

        this.orchestrator =
            new SystemOrchestrator(
                this.kernel
            );

        this.dispatcher =
            new AgentDispatcher(
                this.bus,
                this.orchestrator,
                this.permissions
            );

        this.monitor =
            new HealthMonitor(
                this.bus
            );

        this.runtime =
            new RuntimeManager(
                this.dispatcher,
                this.bus
            );
    }

    public async start(): Promise<void> {
        await this.kernel.initialize();

        console.log(
            '[BOOT] Storage Kernel Ready'
        );

        this.runtime.start();
    }

    public async bootstrap(): Promise<void> {
        await this.start();

        console.log(
            '[BOOT] Maleka Core Bootstrapped.'
        );
    }
}
