"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachRuntimeSubscribers = attachRuntimeSubscribers;
function attachRuntimeSubscribers(bus, dispatcher) {
    bus.on('SYSTEM_STARTED', payload => {
        console.log('[EVENT] SYSTEM_STARTED', payload);
    });
    bus.on('SYSTEM_HEALTH_CHECK', payload => {
        console.log('[EVENT] SYSTEM_HEALTH_CHECK', payload);
    });
    bus.on('TELEMETRY_UPDATE', payload => {
        console.log('[EVENT] TELEMETRY_UPDATE', payload);
    });
    bus.on('SYSTEM_METRICS_UPDATED', async (metrics) => {
        console.log('[EVENT] SYSTEM_METRICS_UPDATED', metrics);
        await dispatcher.dispatch('RES_01', {
            agentId: 'RUNTIME',
            cpuUsage: metrics.cpuPercent,
            ramUsage: metrics.memoryUsedMb
        });
        await dispatcher.dispatch('SCALE_01', {
            currentLoad: metrics.cpuPercent,
            threshold: 80
        });
        await dispatcher.dispatch('RISK_01', {
            componentId: 'RUNTIME',
            failureProbability: metrics.cpuPercent >= 90
                ? 0.90
                : metrics.cpuPercent >= 75
                    ? 0.50
                    : metrics.cpuPercent >= 50
                        ? 0.20
                        : 0.05
        });
        await dispatcher.dispatch('DASH_01', {
            systemState: metrics
        });
    });
}
