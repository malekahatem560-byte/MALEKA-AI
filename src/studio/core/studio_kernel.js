"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioKernel = void 0;
const studio_registry_1 = require("../services/studio_registry");
const studio_manager_1 = require("../services/studio_manager");
class StudioKernel {
    registry = new studio_registry_1.StudioRegistry();
    manager = new studio_manager_1.StudioManager(this.registry);
    health() {
        return {
            status: 'ONLINE',
            projects: this.registry.count(),
            timestamp: Date.now()
        };
    }
}
exports.StudioKernel = StudioKernel;
