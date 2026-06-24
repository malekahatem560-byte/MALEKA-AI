export class TelemetryManager {
    private history: { latency: number }[] = [];
    public recordLatency(ms: number): void {
        this.history.push({ latency: ms });
        if (this.history.length > 50) this.history.shift();
    }
    public getRecentMetrics() {
        const avg = this.history.reduce((a, b) => a + b.latency, 0) / (this.history.length || 1);
        return { latencyTrend: avg > 50 ? 0.9 : 0.2 };
    }
}
