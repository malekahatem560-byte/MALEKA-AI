"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketGateway = void 0;
const ws_1 = require("ws");
class WebSocketGateway {
    bus;
    wss;
    constructor(bus, server) {
        this.bus = bus;
        this.wss = new ws_1.WebSocketServer({ server });
        this.wss.on('connection', ws => {
            ws.send(JSON.stringify({
                type: 'MALEKA_CONNECTED',
                timestamp: Date.now()
            }));
        });
        this.bus.on('TELEMETRY_UPDATE', data => {
            const payload = JSON.stringify({
                type: 'TELEMETRY_UPDATE',
                payload: data
            });
            this.wss.clients.forEach(client => {
                if (client.readyState === 1) {
                    client.send(payload);
                }
            });
        });
        this.bus.on('SYSTEM_METRICS_UPDATED', data => {
            const payload = JSON.stringify({
                type: 'SYSTEM_METRICS_UPDATED',
                payload: data
            });
            this.wss.clients.forEach(client => {
                if (client.readyState === 1) {
                    client.send(payload);
                }
            });
        });
    }
}
exports.WebSocketGateway = WebSocketGateway;
