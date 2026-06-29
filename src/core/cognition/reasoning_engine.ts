import {
CognitiveContext,
ReasoningResult,
MemoryRecord
} from './types';

export class ReasoningEngine {

public async reason(
context: CognitiveContext,
memories: MemoryRecord[] = []
): Promise<ReasoningResult> {

const evidence =
    memories.map(
        m => m.content
    );

return {
    success: true,
    confidence:
        memories.length > 0
            ? 0.95
            : 0.50,
    conclusion:
        context.content,
    evidence
};

}

}
