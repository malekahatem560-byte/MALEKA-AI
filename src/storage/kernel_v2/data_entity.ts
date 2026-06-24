import { randomUUID } from 'crypto';
export interface DataEntity { id: string; payload: Uint8Array; priority: 'CRITICAL' | 'NORMAL' | 'ARCHIVE'; timestamp: number; nodeOrigin: string; }
export class EntityFactory {
    public static create(payload: Uint8Array, priority: 'CRITICAL' | 'NORMAL' = 'NORMAL'): DataEntity {
        return { id: randomUUID(), payload, priority, timestamp: Date.now(), nodeOrigin: 'MALEKA_CORE_01' };
    }
}
