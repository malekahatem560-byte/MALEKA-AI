export class EmbeddingService {
    public async generate(text: string): Promise<number[]> {
        // محاكاة لعملية تحويل النص إلى متجه (Embedding)
        return text.split('').map(char => char.charCodeAt(0) / 255);
    }
}
