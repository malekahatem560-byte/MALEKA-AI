import express from 'express';
import { createServer as createHttpServer } from 'http';
import { WebSocketGateway } from '../ws/websocket_gateway';
import { EventBus } from '../../core/event_bus';

export function setupInfrastructure(bus: EventBus) {

    const app = express();

    app.use(express.json());
    app.use(express.static('public'));

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

    const httpServer = createHttpServer(app);

    new WebSocketGateway(
        bus,
        httpServer
    );

    return httpServer;
}
