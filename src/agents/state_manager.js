"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateManager = void 0;
class StateManager {
    state = {};
    getCurrent() {
        return this.state;
    }
    update(key, value) {
        this.state[key] = value;
    }
}
exports.StateManager = StateManager;
