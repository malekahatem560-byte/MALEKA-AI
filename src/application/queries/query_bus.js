"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBus = void 0;
class QueryBus {
    handlers = new Map();
    register(queryType, handler) {
        this.handlers.set(queryType, handler);
    }
    async execute(query) {
        const handler = this.handlers.get(query.type);
        if (!handler) {
            throw new Error(`No handler registered for query: ${query.type}`);
        }
        return await handler.execute(query);
    }
}
exports.QueryBus = QueryBus;
