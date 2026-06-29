"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinaryFrameEncoder = void 0;
class BinaryFrameEncoder {
    encode(payload) {
        const frame = new Uint8Array(4 + payload.length);
        const view = new DataView(frame.buffer);
        view.setUint32(0, payload.length, true);
        frame.set(payload, 4);
        return frame;
    }
}
exports.BinaryFrameEncoder = BinaryFrameEncoder;
