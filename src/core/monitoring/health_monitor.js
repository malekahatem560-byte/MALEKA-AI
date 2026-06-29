"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthMonitor = void 0;
class HealthMonitor {
    bus;
    constructor(bus) {
        this.bus = bus;
    }
    checkSystemHealth() {
        const health = { status: 'OK', timestamp: Date.now() };
        this.bus.emit('SYSTEM_HEALTH_CHECK', health);
        return health;
    }
}
exports.HealthMonitor = HealthMonitor;
