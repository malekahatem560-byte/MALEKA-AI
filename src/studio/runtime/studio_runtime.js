"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudioRuntime = void 0;
class StudioRuntime {
    kernel;
    constructor(kernel) {
        this.kernel = kernel;
    }
    start() {
        console.log('[STUDIO_RUNTIME]', 'Managed By Core Runtime');
    }
}
exports.StudioRuntime = StudioRuntime;
