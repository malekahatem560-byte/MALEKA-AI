import { StorageKernelV2 } from '../../storage/kernel_v2/storage_kernel_v2';
import { EventBus } from '../../core/event_bus';

export abstract class BaseStudioAgent {
    constructor(
        public readonly id: string,
        protected readonly kernel: StorageKernelV2,
        protected readonly bus: EventBus
    ) {}

    abstract execute(task: any): Promise<any>;
}
