import { UnityBridge } from './gics/engine/unity_bridge';
async function bootstrap() {
    const bridge = new UnityBridge();
    console.log("--- GICS 1.0 SYSTEM INITIALIZED ---");
    try {
        // إعطاء الأمر لبدء إنتاج مشهد بناءً على موضوع معين
        const production = await bridge.processCinematicAtom("The Mystery of the Khafre Asymmetry");
        console.log("--- PRODUCTION SUCCESSFUL ---");
        console.log("Output Data:", production.data);
    }
    catch (error) {
        console.error("--- PRODUCTION FAILED ---", error);
    }
}
bootstrap();
