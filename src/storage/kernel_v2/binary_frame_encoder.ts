export class BinaryFrameEncoder {
public encode(payload: Uint8Array): Uint8Array {
const frame = new Uint8Array(4 + payload.length);

    const view = new DataView(frame.buffer);
    view.setUint32(0, payload.length, true);

    frame.set(payload, 4);

    return frame;
}

}
