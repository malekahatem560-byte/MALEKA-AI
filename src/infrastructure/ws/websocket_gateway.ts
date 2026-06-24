import { Server } from 'http';
import { WebSocketServer } from 'ws';
import { EventBus } from '../../core/event_bus';
export class WebSocketGateway {
    private wss: WebSocketServer;
    constructor(private bus: EventBus, server: Server) {
        this.wss = new WebSocketServer({ server });
        this.bus.subscribe('TELEMETRY_UPDATE', (data) => {
            this.wss.clients.forEach(c => c.send(JSON.stringify(data)));
        });
    }
}
