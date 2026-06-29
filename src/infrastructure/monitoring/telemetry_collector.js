"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryCollector = void 0;
const events_1 = require("events");
class TelemetryCollector extends events_1.EventEmitter {
    buffer = [];
    MAX_BUFFER_SIZE = 1000;
    record(operation, start, metadata = {}) {
        const end = process.hrtime.bigint();
        const durationMs = Number(end - start) / 1_000_000;
        const event = {
            traceId: Math.random().toString(36).substring(2),
            spanId: Math.random().toString(36).substring(2),
            operation,
            timestamp: Date.now(),
            durationMs,
            metadata
        };
        this.buffer.push(event);
        this.emit('telemetry', event);
        if (this.buffer.length >= this.MAX_BUFFER_SIZE) {
            this.flush();
        }
    }
    flush() {
        const data = [...this.buffer];
        this.buffer.length = 0;
        // Export to external observability stack
    }
}
exports.TelemetryCollector = TelemetryCollector;
