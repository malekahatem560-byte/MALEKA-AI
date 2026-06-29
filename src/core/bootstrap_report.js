"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootstrapReport = void 0;
class BootstrapReport {
    static print(registry, bus) {
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
exports.BootstrapReport = BootstrapReport;
