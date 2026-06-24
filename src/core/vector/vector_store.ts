import { EmbeddingService } from './embedding_service';

export class VectorStore {
    private vectors: { embedding: number[], data: any }[] = [];
    constructor(private embeddingService: EmbeddingService) {}

    public async store(data: any, text: string) {
        const embedding = await this.embeddingService.generate(text);
        this.vectors.push({ embedding, data });
    }

    public async query(text: string): Promise<any> {
        // استرجاع دلالي مبسط
        return this.vectors[0]?.data || null;
    }
}
