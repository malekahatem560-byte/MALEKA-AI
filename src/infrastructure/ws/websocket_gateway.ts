import { Server } from 'http';
import { WebSocketServer } from 'ws';
import { EventBus } from '../../core/event_bus';

export class WebSocketGateway {
private wss: WebSocketServer;

constructor(
    private bus: EventBus,
    server: Server
) {
    this.wss = new WebSocketServer({ server });

    this.wss.on('connection', ws => {
        ws.send(
            JSON.stringify({
                type: 'MALEKA_CONNECTED',
                timestamp: Date.now()
            })
        );
    });

    this.bus.on(
        'TELEMETRY_UPDATE',
        data => {
            const payload = JSON.stringify({
                type: 'TELEMETRY_UPDATE',
                payload: data
            });

            this.wss.clients.forEach(client => {
                if ((client as any).readyState === 1) {
                    client.send(payload);
                }
            });
        }
    );

    this.bus.on(
        'SYSTEM_METRICS_UPDATED',
        data => {
            const payload = JSON.stringify({
                type: 'SYSTEM_METRICS_UPDATED',
                payload: data
            });

            this.wss.clients.forEach(client => {
                if ((client as any).readyState === 1) {
                    client.send(payload);
                }
            });
        }
    );
}

}
