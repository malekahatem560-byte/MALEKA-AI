import os from 'os';

export interface SystemMetrics {
timestamp: number;
cpuPercent: number;
memoryUsedMb: number;
memoryFreeMb: number;
memoryTotalMb: number;
memoryPercent: number;
systemLoad: number;
uptime: number;
}

export class SystemMetricsProvider {
public getMetrics(): SystemMetrics {
const mem = process.memoryUsage();

const totalMem = os.totalmem() / 1024 / 1024;
const freeMem = os.freemem() / 1024 / 1024;

return {
  timestamp: Date.now(),
  cpuPercent: Number(os.loadavg()[0].toFixed(2)),
  memoryUsedMb: Math.round(mem.rss / 1024 / 1024),
  memoryFreeMb: Math.round(freeMem),
  memoryTotalMb: Math.round(totalMem),
  memoryPercent: Number(
    (((totalMem - freeMem) / totalMem) * 100).toFixed(2)
  ),
  systemLoad: Number(os.loadavg()[0].toFixed(2)),
  uptime: process.uptime()
};

}
}
