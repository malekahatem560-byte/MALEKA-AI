export function patchBigIntSerialization() {
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
    };
}
