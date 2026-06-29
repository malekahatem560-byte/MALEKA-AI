"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maleka_engine_1 = require("./core/maleka_engine");
const server_1 = require("./infrastructure/api/server");
async function boot() {
    console.log('[BOOT] Starting MALEKA Runtime...');
    const engine = new maleka_engine_1.MalekaEngine();
    await engine.bootstrap();
    console.log('[BOOT] Runtime Active');
    const httpServer = (0, server_1.setupInfrastructure)(engine.bus, engine.orchestrator);
    httpServer.listen(8080, '0.0.0.0', () => {
        console.log('[BOOT] API ACTIVE :8080');
        console.log('[BOOT] WS ACTIVE :8080');
    });
}
boot().catch(err => {
    console.error('[FATAL BOOT ERROR]', err);
    process.exit(1);
});
