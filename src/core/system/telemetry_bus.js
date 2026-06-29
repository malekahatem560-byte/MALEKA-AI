"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryBus = void 0;
class TelemetryBus {
    bus;
    constructor(bus) {
        this.bus = bus;
    }
    publish(metrics) {
        this.bus.emit('SYSTEM_METRICS_UPDATED', metrics);
    }
}
exports.TelemetryBus = TelemetryBus;
