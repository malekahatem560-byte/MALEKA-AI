"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceSampler = void 0;
class ResourceSampler {
    provider;
    latest = null;
    constructor(provider) {
        this.provider = provider;
    }
    sample() {
        this.latest = this.provider.getMetrics();
        return this.latest;
    }
    getLatest() {
        return this.latest;
    }
}
exports.ResourceSampler = ResourceSampler;
