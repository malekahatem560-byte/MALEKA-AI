import { IMemoryRetriever } from './interfaces';
import { MemoryRecord } from './types';
import { EpisodicMemory } from './episodic_memory';

export class MemoryRetriever
implements IMemoryRetriever {

constructor(
    private readonly episodic: EpisodicMemory
) {}

public async retrieve(
    query: string
): Promise<MemoryRecord[]> {

    const normalized =
        query.toLowerCase();

    return this.episodic
        .getAll()
        .filter(
            memory =>
                memory.content
                    .toLowerCase()
                    .includes(
                        normalized
                    )
        );
}

}
