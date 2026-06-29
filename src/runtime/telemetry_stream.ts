import { EventBus } from '../core/event_bus';

export class TelemetryStream {
constructor(
private bus: EventBus
) {}

public publish(data: any): void {
    this.bus.emit(
        'TELEMETRY_UPDATE',
        data
    );
}

public publishMetrics(data: any): void {
    this.bus.emit(
        'SYSTEM_METRICS_UPDATED',
        data
    );
}

}
