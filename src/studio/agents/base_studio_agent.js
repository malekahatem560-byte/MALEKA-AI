"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStudioAgent = void 0;
class BaseStudioAgent {
    id;
    kernel;
    bus;
    constructor(id, kernel, bus) {
        this.id = id;
        this.kernel = kernel;
        this.bus = bus;
    }
}
exports.BaseStudioAgent = BaseStudioAgent;
