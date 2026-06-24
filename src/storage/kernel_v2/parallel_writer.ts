import { AdaptiveCompressor } from './adaptive_compressor';
import { WALWriter } from './wal_writer';

export class ParallelWriter {
    private readonly compressor = new AdaptiveCompressor();
    constructor(private readonly writer: WALWriter) {}
    
    public async enqueue(payload: Uint8Array, sequence: bigint): Promise<void> {
        const compressed = this.compressor.compress(payload);
        await this.writer.write(compressed, sequence);
    }
}
