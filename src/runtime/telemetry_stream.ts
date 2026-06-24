import { EventBus } from '../core/event_bus';
export class TelemetryStream {
    constructor(private bus: EventBus) {
        this.bus.subscribe('KERNEL_WRITE', (data) => this.bus.publish('TELEMETRY_UPDATE', data));
    }
}
