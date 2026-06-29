import { CritiqueJury } from './jury_system';
export class SelfCorrectionLoop {
    jury = new CritiqueJury();
    // حلقة التصحيح: الوكيل يحاول، المحلف يقيم، وإذا فشل يتم التعديل
    async processWithRetry(agentTask, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            const output = await agentTask();
            const evaluation = this.jury.evaluate(output);
            if (evaluation.passed) {
                console.log("[SYSTEM] Data approved by Jury.");
                return output;
            }
            console.warn(`[SYSTEM] Attempt ${i + 1} failed: ${evaluation.reason}. Retrying...`);
        }
        throw new Error("Critical Failure: Agent could not produce valid data after max retries.");
    }
}
