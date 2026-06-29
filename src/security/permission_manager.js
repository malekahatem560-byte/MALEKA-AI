"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionManager = void 0;
class PermissionManager {
    permissions = new Map();
    grant(agentId, permission) {
        const current = this.permissions.get(agentId) || [];
        this.permissions.set(agentId, [...current, permission]);
    }
    hasPermission(agentId, permission) {
        return this.permissions.get(agentId)?.includes(permission) || false;
    }
}
exports.PermissionManager = PermissionManager;
