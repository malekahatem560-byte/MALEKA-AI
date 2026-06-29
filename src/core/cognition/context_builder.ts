import { CognitiveContext } from './types';

export class ContextBuilder {

public build(
    source: string,
    content: string,
    metadata?: Record<string, any>
): CognitiveContext {

    return {
        id:
            `ctx_${Date.now()}`,
        timestamp:
            Date.now(),
        source,
        content,
        metadata
    };
}

}
