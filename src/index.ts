import { MalekaEngine } from './core/maleka_engine';
import { setupInfrastructure } from './infrastructure/api/server';

async function boot() {
    console.log('[BOOT] Starting MALEKA Runtime...');

    const engine = new MalekaEngine();

    await engine.bootstrap();

    console.log('[BOOT] Runtime Active');

    const httpServer = setupInfrastructure(
        (engine as any).bus,
        (engine as any).orchestrator
    );

    httpServer.listen(8080, '0.0.0.0', () => {
        console.log('[BOOT] API ACTIVE :8080');
        console.log('[BOOT] WS ACTIVE :8080');
    });
}

boot().catch(err => {
    console.error('[FATAL BOOT ERROR]', err);
    process.exit(1);
});
