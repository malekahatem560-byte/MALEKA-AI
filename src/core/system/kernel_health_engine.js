"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KernelHealthEngine = void 0;
class KernelHealthEngine {
    evaluate(cpu, memory) {
        if (cpu >= 90 || memory >= 90) {
            return 'CRITICAL';
        }
        if (cpu >= 70 || memory >= 75) {
            return 'DEGRADED';
        }
        return 'HEALTHY';
    }
}
exports.KernelHealthEngine = KernelHealthEngine;
