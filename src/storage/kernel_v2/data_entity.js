"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFactory = void 0;
const crypto_1 = require("crypto");
class EntityFactory {
    static create(payload, priority = 'NORMAL') {
        return { id: (0, crypto_1.randomUUID)(), payload, priority, timestamp: Date.now(), nodeOrigin: 'MALEKA_CORE_01' };
    }
}
exports.EntityFactory = EntityFactory;
