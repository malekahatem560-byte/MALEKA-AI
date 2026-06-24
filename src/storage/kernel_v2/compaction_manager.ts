import { RecoveryManager } from './recovery_manager';
import { IndexManager } from './index_manager';
import { AtomicFissioner } from './atomic_fissioner';

export class CompactionManager {
    private readonly fissioner = new AtomicFissioner();

    constructor(
        private readonly recoveryManager: RecoveryManager, 
        private readonly index: IndexManager
    ) {}

    public async perform(): Promise<void> {
        // الابتكار: الانشطار أثناء التنظيف (Refactoring on the fly)
        console.log("[Compaction] Initiating atomic refactoring...");
        await this.recoveryManager.recover(this.index);
        // هنا يتم استدعاء logic إعادة ترتيب الأنوية (Fission Logic)
    }
}
