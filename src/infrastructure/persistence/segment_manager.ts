import { promises as fs } from 'fs';
import { join } from 'path';

export class SegmentManager {
    constructor(private readonly basePath: string, private readonly maxSegmentSize: number) {}

    public async rotate(partition: string): Promise<string> {
        const timestamp = Date.now();
        const newSegmentPath = join(this.basePath, `${partition}-${timestamp}.log`);
        await fs.writeFile(newSegmentPath, '');
        return newSegmentPath;
    }

    public async getActiveSegment(partition: string): Promise<string> {
        return join(this.basePath, `${partition}.active.log`);
    }

    public async checkRetention(partition: string, maxAge: number): Promise<void> {
        const files = await fs.readdir(this.basePath);
        for (const file of files) {
            if (file.startsWith(partition)) {
                const stats = await fs.stat(join(this.basePath, file));
                if (Date.now() - stats.mtimeMs > maxAge) {
                    await fs.unlink(join(this.basePath, file));
                }
            }
        }
    }
}
