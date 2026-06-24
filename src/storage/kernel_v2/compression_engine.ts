import * as zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);

export class CompressionEngine {
    // ضغط البيانات فقط إذا تجاوز حجمها حد معين (مثلاً 1KB)
    public async compress(data: Uint8Array): Promise<Uint8Array> {
        if (data.length < 1024) return data; 
        return await gzip(data);
    }
}
