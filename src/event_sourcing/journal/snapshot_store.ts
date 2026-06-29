import fs from 'fs/promises';
import * as path from 'node:path';

export interface Snapshot {
    aggregateId: string;
    version: number;
    state: any;
}

export class SnapshotStore {
    constructor(private readonly storagePath: string) {}

    public async saveSnapshot(snapshot: Snapshot): Promise<void> {
        const filePath = path.join(this.storagePath, `${snapshot.aggregateId}.snapshot`);
        await fs.writeFile(filePath, JSON.stringify(snapshot));
    }

    public async loadSnapshot(aggregateId: string): Promise<Snapshot | null> {
        try {
            const filePath = path.join(this.storagePath, `${aggregateId}.snapshot`);
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch {
            return null;
        }
    }
}
