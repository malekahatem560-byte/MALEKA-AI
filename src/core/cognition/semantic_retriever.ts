import { ISemanticRetriever } from './interfaces';
import { MemoryRecord } from './types';
import { VectorStore } from '../vector/vector_store';

export class SemanticRetriever
implements ISemanticRetriever {

constructor(
    private readonly vectorStore: VectorStore
) {}

public async search(
    query: string
): Promise<MemoryRecord[]> {

    const result =
        await this.vectorStore.query(
            query
        );

    if (!result) {
        return [];
    }

    return [result as MemoryRecord];
}

}
