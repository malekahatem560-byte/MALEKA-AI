"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplayGuard = void 0;
class ReplayGuard {
    active = false;
    begin() {
        this.active = true;
    }
    end() {
        this.active = false;
    }
    isActive() {
        return this.active;
    }
}
exports.ReplayGuard = ReplayGuard;
