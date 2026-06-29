import { DomainEvent } from '../../event_sourcing/domain_event';
import * as fs from 'fs/promises';
import * as path from 'path';

export class DurableAppendLog {
    constructor(private readonly storagePath: string = "./data") {}

    private filePath(id: string) {
        return path.join(this.storagePath, `${id}.log.json`);
    }

    public async append(event: DomainEvent): Promise<void> {
        const file = this.filePath(event.aggregateId);

        let events: any[] = [];
        try {
            const data = await fs.readFile(file, 'utf-8');
            events = JSON.parse(data);
        } catch {}

        events.push(event);
        await fs.writeFile(file, JSON.stringify(events));
    }

    public async replay(
        aggregateId: string,
        callback: (event: DomainEvent) => Promise<void>
    ): Promise<void> {
        const file = this.filePath(aggregateId);

        try {
            const data = await fs.readFile(file, 'utf-8');
            const events: DomainEvent[] = JSON.parse(data);

            for (const event of events) {
                await callback(event);
            }
        } catch {
            return;
        }
    }
}
