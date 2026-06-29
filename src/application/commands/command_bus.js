"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBus = void 0;
class CommandBus {
    handlers = new Map();
    register(commandType, handler) {
        this.handlers.set(commandType, handler);
    }
    async dispatch(command) {
        const handler = this.handlers.get(command.type);
        if (!handler) {
            throw new Error(`No handler registered for command: ${command.type}`);
        }
        await handler.handle(command);
    }
}
exports.CommandBus = CommandBus;
