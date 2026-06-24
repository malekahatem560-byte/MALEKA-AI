import { KernelEngine } from './engine';

async function bootSystem() {
    console.log("[MALEKA] Initializing Sovereignty Kernel...");
    const engine = new KernelEngine('./data_prod');
    
    try {
        await engine.boot();
        console.log("[MALEKA] System Operational: All layers synced.");
    } catch (err) {
        console.error("[MALEKA] Critical Failure: System halted.", err);
    }
}
bootSystem();
