import { UnityBridge } from './gics/engine/unity_bridge';
async function auditSystem() {
    console.log("--- STARTING INTEGRATION AUDIT ---");
    const bridge = new UnityBridge();
    try {
        const result = await bridge.processCinematicAtom("Integrity Check");
        console.log("[AUDIT] Result:", result.status);
    }
    catch (error) {
        console.error("[AUDIT] FAILED:", error);
    }
}
auditSystem();
