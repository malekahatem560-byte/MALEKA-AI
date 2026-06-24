export class IndexManager {
    // تخزين العلاقة بين رقم التسلسل وموقعه في الملف
    private readonly index = new Map<bigint, number>();
    private currentOffset = 0;

    public update(sequence: bigint, size: number): void {
        this.index.set(sequence, this.currentOffset);
        this.currentOffset += size + 16; // 16 هو حجم الـ Header
    }

    public getOffset(sequence: bigint): number | undefined {
        return this.index.get(sequence);
    }

    public clear(): void {
        this.index.clear();
        this.currentOffset = 0;
    }
}
