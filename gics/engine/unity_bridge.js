import { CreativeDirector } from './core/creative_director';
import { NeuralFoundry } from './foundry/neural_foundry';
import { SelfCorrectionLoop } from './critique/self_correction';
import { AtomicStore } from '../../atomic_store';
export class UnityBridge {
    director = new CreativeDirector();
    foundry = new NeuralFoundry();
    correctionLoop = new SelfCorrectionLoop();
    async processCinematicAtom(theme) {
        console.log(`[BRIDGE] Starting atomic production for: ${theme}`);
        const finalOutput = await this.correctionLoop.processWithRetry(async () => {
            const plan = await this.director.synthesizeScene({ theme, emotion: 'awe', complexity: 'atomic' });
            const frame = await this.foundry.generateFrame(plan);
            return { plan, frame };
        });
        // أمر التحقق التكاملي والحفظ الفوري
        const saved = AtomicStore.saveEntry(theme.replace(/\s+/g, '_'), finalOutput);
        return {
            status: saved ? 'PRODUCTION_COMPLETE' : 'INTEGRITY_FAILURE',
            data: finalOutput
        };
    }
}
