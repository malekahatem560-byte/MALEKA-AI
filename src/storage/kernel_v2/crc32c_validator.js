"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRC32CValidator = void 0;
class CRC32CValidator {
    compute(data) {
        let crc = 0xFFFFFFFF;
        for (let i = 0; i < data.length; i++) {
            crc ^= data[i];
            for (let j = 0; j < 8; j++) {
                crc = (crc >>> 1) ^ ((crc & 1) ? 0x82F63B78 : 0);
            }
        }
        return (crc ^ 0xFFFFFFFF) >>> 0;
    }
    static calculate(data) {
        return new CRC32CValidator().compute(data);
    }
    static validate(data, expected) {
        return new CRC32CValidator().compute(data) === expected;
    }
}
exports.CRC32CValidator = CRC32CValidator;
