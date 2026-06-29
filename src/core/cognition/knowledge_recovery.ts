import { EpisodicMemory } from './episodic_memory';
import { MemoryRecord } from './types';

export class KnowledgeRecovery {

constructor(
private readonly episodic: EpisodicMemory
) {}

public recoverRecord(
record: MemoryRecord
): void {

this.episodic.add(record);

}

}
