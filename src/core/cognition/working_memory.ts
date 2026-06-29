import { CognitiveContext } from './types';

export class WorkingMemory {

private readonly buffer: CognitiveContext[] = [];

private readonly MAX_ITEMS = 100;

public add(
    context: CognitiveContext
): void {

    this.buffer.push(context);

    if (
        this.buffer.length >
        this.MAX_ITEMS
    ) {
        this.buffer.shift();
    }
}

public getAll(): CognitiveContext[] {
    return [...this.buffer];
}

public clear(): void {
    this.buffer.length = 0;
}

public size(): number {
    return this.buffer.length;
}

}
