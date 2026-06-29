import { EventBus } from '../event_bus';

export class TelemetryBus {
constructor(private bus: EventBus) {}

public publish(metrics: any): void {
this.bus.emit('SYSTEM_METRICS_UPDATED', metrics);
}
}
