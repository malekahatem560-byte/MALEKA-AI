import { EventBus } from '../event_bus';

export class HealthMonitor {
    constructor(private bus: EventBus) {}

    public checkSystemHealth(): { status: string, timestamp: number } {
        const health = { status: 'OK', timestamp: Date.now() };
        this.bus.emit('SYSTEM_HEALTH_CHECK', health);
        return health;
    }
}
