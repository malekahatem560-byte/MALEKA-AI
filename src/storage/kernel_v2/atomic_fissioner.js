"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtomicFissioner = void 0;
class AtomicFissioner {
    // تقنية الانشطار: فصل الوزن المعلوماتي عن الحمولة
    split(data) {
        const pivot = Math.floor(data.length * 0.2); // نقطة الانشطار
        return {
            heavy: data.subarray(0, pivot),
            light: data.subarray(pivot)
        };
    }
}
exports.AtomicFissioner = AtomicFissioner;
