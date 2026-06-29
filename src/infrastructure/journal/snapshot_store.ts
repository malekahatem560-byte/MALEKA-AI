import { promises as fs } from 'fs';
import * as path from 'path';

export class SnapshotStore {
    private readonly dir = path.join(process.cwd(), 'snapshots');

    constructor() {}

    public async save(id: string, state: any): Promise<void> {
        await fs.mkdir(this.dir, { recursive: true });

        const file = path.join(this.dir, `${id}.json`);
        await fs.writeFile(file, JSON.stringify({
            id,
            state,
            timestamp: Date.now()
        }));
    }

    public async load(id: string): Promise<any | null> {
        try {
            const file = path.join(this.dir, `${id}.json`);
            const data = await fs.readFile(file, 'utf-8');
            return JSON.parse(data);
        } catch {
            return null;
        }
    }
}
