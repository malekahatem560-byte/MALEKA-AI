"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryManager = void 0;
class TelemetryManager {
    history = [];
    recordLatency(ms) {
        this.history.push({ latency: ms });
        if (this.history.length > 50)
            this.history.shift();
    }
    getRecentMetrics() {
        const avg = this.history.reduce((a, b) => a + b.latency, 0) / (this.history.length || 1);
        return { latencyTrend: avg > 50 ? 0.9 : 0.2 };
    }
}
exports.TelemetryManager = TelemetryManager;
