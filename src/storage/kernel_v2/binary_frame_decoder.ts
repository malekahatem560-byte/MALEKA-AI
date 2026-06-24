/**
 * MALEKA FROZEN ARCHITECTURE
 * Component: BinaryFrameDecoder
 * Purpose: Stream-based zero-copy frame extraction using little-endian headers.
 */

export interface DecodedFrame {
    payload: Uint8Array;
}

export class BinaryFrameDecoder {
    private buffer: Uint8Array = new Uint8Array(0);

    public async *decode(source: AsyncIterable<Uint8Array>): AsyncGenerator<DecodedFrame, void, unknown> {
        for await (const chunk of source) {
            this.buffer = this.concat(this.buffer, chunk);

            while (this.buffer.length >= 4) {
                const view = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
                const frameLength = view.getUint32(0, true);

                if (frameLength > 64 * 1024 * 1024) {
                    throw new Error("CORRUPTION: Invalid frame length detected");
                }

                if (this.buffer.length >= 4 + frameLength) {
                    const payload = this.buffer.subarray(4, 4 + frameLength);
                    yield { payload };
                    this.buffer = this.buffer.subarray(4 + frameLength);
                } else {
                    break;
                }
            }
        }
    }

    private concat(a: Uint8Array, b: Uint8Array): Uint8Array {
        const res = new Uint8Array(a.length + b.length);
        res.set(a, 0);
        res.set(b, a.length);
        return res;
    }
}
