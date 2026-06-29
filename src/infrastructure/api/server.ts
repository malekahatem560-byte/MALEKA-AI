import express from 'express';
import { createServer as createHttpServer } from 'http';
import { WebSocketGateway } from '../ws/websocket_gateway';
import { registerStudioRoutes } from '../../studio/api/studio_routes';
import { EventBus } from '../../core/event_bus';

export function setupInfrastructure(
    bus: EventBus,
    orchestrator?: any
) {
    const app = express();

    app.use(express.json());
    app.use(express.static('public'));

    // Register studio routes once (previously duplicated in earlier commit).
    registerStudioRoutes(app);

    app.get('/', (_, res) => {
        res.json({
            system: 'MALEKA',
            status: 'ONLINE',
            version: 'V2'
        });
    });

    app.get('/health', (_, res) => {
        res.json({
            status: 'healthy',
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            cpu: process.cpuUsage()
        });
    });

    app.get('/telemetry', (_, res) => {
        res.json({
            timestamp: Date.now(),
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
            uptime: process.uptime()
        });
    });

    app.get('/agents', (_, res) => {
        if (!orchestrator) {
            return res.json({
                status: 'orchestrator_not_attached'
            });
        }

        res.json({
            totalAgents: orchestrator.registry.count(),
            agents: orchestrator.registry.getAgentIds()
        });
    });

    
app.get("/kernel", (_, res) => {
res.json({
status:"ONLINE",
uptime:process.uptime(),
memory:process.memoryUsage(),
cpu:process.cpuUsage(),
pid:process.pid,
platform:process.platform,
node:process.version
});
});

app.get("/runtime", (_, res) => {
res.json({
status:"RUNNING",
timestamp:Date.now(),
uptime:process.uptime()
});
});

const httpServer = createHttpServer(app);


    new WebSocketGateway(
        bus,
        httpServer
    );

    return httpServer;
}
