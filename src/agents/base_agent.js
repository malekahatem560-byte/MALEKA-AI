"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAgent = void 0;
class BaseAgent {
    id;
    role;
    constructor(id, role) {
        this.id = id;
        this.role = role;
    }
    log(msg) { console.log(`[Agent:${this.role}:${this.id}] ${msg}`); }
}
exports.BaseAgent = BaseAgent;
