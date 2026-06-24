import fs from 'fs/promises';
import path from 'path';

export class LogCompactor {
    constructor(private readonly storagePath: string) {}

    public async compact(aggregateId: string): Promise<void> {
        const filePath = path.join(this.storagePath, `${aggregateId}.log`);
        const data = await fs.readFile(filePath, 'utf-8');
        const events = data.split('\n').filter(Boolean).map(line => JSON.parse(line));

        // الاحتفاظ بآخر حالة (Snapshot) فقط بدلاً من سجل الأحداث الكامل
        const snapshot = events[events.length - 1];
        await fs.writeFile(filePath, JSON.stringify(snapshot) + '\n');
        console.log(`Log compacted for aggregate: ${aggregateId}`);
    }
}
