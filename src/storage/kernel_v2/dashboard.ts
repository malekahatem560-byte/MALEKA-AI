import { KernelEngine } from './engine';

export class Dashboard {
    public static render(metrics: { ops: number, throughput: number }): void {
        console.clear();
        console.log("=== MALEKA KERNEL V2 - LIVE TELEMETRY ===");
        console.log(`Operations/Sec: ${metrics.ops}`);
        console.log(`Throughput: ${metrics.throughput} bytes/ms`);
        console.log("Status: [ACTIVE] - Synchronization Core Running");
        console.log("==========================================");
    }
}
