import { MemoryManager } from '../memory/memory_manager';
import { EpisodicMemory } from './episodic_memory';
import { MemoryRecord } from './types';

export class KnowledgeStore {

constructor(
private readonly memory: MemoryManager,
private readonly episodic: EpisodicMemory
) {}

public async store(
record: MemoryRecord
): Promise<void> {

this.episodic.add(record);

await this.memory.persist(
    record.id,
    record
);

}

public async remember(
content: string
): Promise<MemoryRecord> {

const record: MemoryRecord = {
    id: `mem_${Date.now()}`,
    timestamp: Date.now(),
    content
};

await this.store(record);

return record;

}

public count(): number {
return this.episodic.count();
}

}
