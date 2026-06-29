import { MemoryRecord } from './types';

export class EpisodicMemory {

private readonly memories: MemoryRecord[] = [];

public add(
    memory: MemoryRecord
): void {
    this.memories.push(memory);
}

public getAll(): MemoryRecord[] {
    return [...this.memories];
}

public getLatest(
    limit: number = 10
): MemoryRecord[] {
    return this.memories.slice(-limit);
}

public count(): number {
    return this.memories.length;
}

public clear(): void {
    this.memories.length = 0;
}

}
