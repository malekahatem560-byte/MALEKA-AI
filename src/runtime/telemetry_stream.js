"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryStream = void 0;
class TelemetryStream {
    bus;
    constructor(bus) {
        this.bus = bus;
    }
    publish(data) {
        this.bus.emit('TELEMETRY_UPDATE', data);
    }
    publishMetrics(data) {
        this.bus.emit('SYSTEM_METRICS_UPDATED', data);
    }
}
exports.TelemetryStream = TelemetryStream;
