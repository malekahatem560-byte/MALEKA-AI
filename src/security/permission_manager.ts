export type Permission = 'READ' | 'WRITE' | 'EXECUTE';

export class PermissionManager {
    private permissions: Map<string, Permission[]> = new Map();

    public grant(agentId: string, permission: Permission) {
        const current = this.permissions.get(agentId) || [];
        this.permissions.set(agentId, [...current, permission]);
    }

    public hasPermission(agentId: string, permission: Permission): boolean {
        return this.permissions.get(agentId)?.includes(permission) || false;
    }
}
