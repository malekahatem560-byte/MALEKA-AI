"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompactionManager = void 0;
const atomic_fissioner_1 = require("./atomic_fissioner");
class CompactionManager {
    recoveryManager;
    index;
    fissioner = new atomic_fissioner_1.AtomicFissioner();
    constructor(recoveryManager, index) {
        this.recoveryManager = recoveryManager;
        this.index = index;
    }
    async perform() {
        // الابتكار: الانشطار أثناء التنظيف (Refactoring on the fly)
        console.log("[Compaction] Initiating atomic refactoring...");
        await this.recoveryManager.recover(this.index);
        // هنا يتم استدعاء logic إعادة ترتيب الأنوية (Fission Logic)
    }
}
exports.CompactionManager = CompactionManager;
