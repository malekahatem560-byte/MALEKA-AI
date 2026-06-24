import { ParallelWriter } from './parallel_writer';

export class ShardManager {
    private shards: Map<number, ParallelWriter> = new Map();
    
    public getWriter(sequence: bigint): ParallelWriter {
        const shardId = Number(sequence % 4n);
        return this.shards.get(shardId)!;
    }
}
