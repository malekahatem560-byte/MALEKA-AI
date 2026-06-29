"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
async function bootSystem() {
    console.log("[MALEKA] Initializing Sovereignty Kernel...");
    const engine = new engine_1.KernelEngine('./data_prod');
    try {
        await engine.boot();
        console.log("[MALEKA] System Operational: All layers synced.");
    }
    catch (err) {
        console.error("[MALEKA] Critical Failure: System halted.", err);
    }
}
bootSystem();
