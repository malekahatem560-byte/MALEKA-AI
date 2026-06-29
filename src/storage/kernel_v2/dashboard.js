"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
class Dashboard {
    static render(metrics) {
        console.clear();
        console.log("=== MALEKA KERNEL V2 - LIVE TELEMETRY ===");
        console.log(`Operations/Sec: ${metrics.ops}`);
        console.log(`Throughput: ${metrics.throughput} bytes/ms`);
        console.log("Status: [ACTIVE] - Synchronization Core Running");
        console.log("==========================================");
    }
}
exports.Dashboard = Dashboard;
