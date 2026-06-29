import { SystemMetricsProvider, SystemMetrics } from './system_metrics_provider';

export class ResourceSampler {
private latest: SystemMetrics | null = null;

constructor(
private provider: SystemMetricsProvider
) {}

public sample(): SystemMetrics {
this.latest = this.provider.getMetrics();
return this.latest;
}

public getLatest(): SystemMetrics | null {
return this.latest;
}
}
