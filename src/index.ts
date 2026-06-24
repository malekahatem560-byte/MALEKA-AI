import { setupInfrastructure } from './infrastructure/api/server';
import { EventBus } from './core/event_bus';
import { MalekaEngine } from './core/maleka_engine';

const bus = new EventBus();
const engine = new MalekaEngine();

// Boot the engine
(async () => {
    try {
        await engine.bootstrap();
    } catch (err) {
        console.error("[FATAL BOOT ERROR]", err);
        process.exit(1);
    }
})();

// Setup infrastructure with the event bus
const server = setupInfrastructure(bus);

server.listen(8080, () => {
    console.log("MALEKA Server running on port 8080");
});
