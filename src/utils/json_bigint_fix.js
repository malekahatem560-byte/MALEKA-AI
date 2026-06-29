"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchBigIntSerialization = patchBigIntSerialization;
function patchBigIntSerialization() {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
}
