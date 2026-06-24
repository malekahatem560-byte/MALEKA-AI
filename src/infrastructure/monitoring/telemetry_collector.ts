import { EventEmitter } from 'events';

export interface TelemetryEvent {
    traceId: string;
    spanId: string;
    operation: string;
    timestamp: number;
    durationMs: number;
    metadata: Record<string, any>;
}

export class TelemetryCollector extends EventEmitter {
    private readonly buffer: TelemetryEvent[] = [];
    private readonly MAX_BUFFER_SIZE = 1000;

    public record(operation: string, start: bigint, metadata: Record<string, any> = {}): void {
        const end = process.hrtime.bigint();
        const durationMs = Number(end - start) / 1_000_000;
        
        const event: TelemetryEvent = {
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

    public flush(): void {
        const data = [...this.buffer];
        this.buffer.length = 0;
        // Export to external observability stack
    }
}
