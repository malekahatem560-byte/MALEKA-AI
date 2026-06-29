import { MemoryRecord } from './types';

export class ReflectionEngine {

public reflect(
memories: MemoryRecord[]
): string {

if (memories.length === 0) {
return 'NO_MEMORY';
}

const latest =
memories[memories.length - 1];

return `REFLECTION:${latest.content}`;

}

public score(
memories: MemoryRecord[]
): number {

if (memories.length === 0) {
return 0;
}

return Math.min(
1,
memories.length / 100
);

}

}
