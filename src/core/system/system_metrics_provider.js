"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMetricsProvider = void 0;
const os_1 = __importDefault(require("os"));
class SystemMetricsProvider {
    getMetrics() {
        const mem = process.memoryUsage();
        const totalMem = os_1.default.totalmem() / 1024 / 1024;
        const freeMem = os_1.default.freemem() / 1024 / 1024;
        return {
            timestamp: Date.now(),
            cpuPercent: Number(os_1.default.loadavg()[0].toFixed(2)),
            memoryUsedMb: Math.round(mem.rss / 1024 / 1024),
            memoryFreeMb: Math.round(freeMem),
            memoryTotalMb: Math.round(totalMem),
            memoryPercent: Number((((totalMem - freeMem) / totalMem) * 100).toFixed(2)),
            systemLoad: Number(os_1.default.loadavg()[0].toFixed(2)),
            uptime: process.uptime()
        };
    }
}
exports.SystemMetricsProvider = SystemMetricsProvider;
