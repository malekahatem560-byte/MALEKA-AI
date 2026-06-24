export interface Command {
    type: string;
    payload: any;
}

export interface CommandHandler<T extends Command> {
    handle(command: T): Promise<void>;
}

export class CommandBus {
    private handlers: Map<string, CommandHandler<any>> = new Map();

    public register<T extends Command>(commandType: string, handler: CommandHandler<T>): void {
        this.handlers.set(commandType, handler);
    }

    public async dispatch<T extends Command>(command: T): Promise<void> {
        const handler = this.handlers.get(command.type);
        if (!handler) {
            throw new Error(`No handler registered for command: ${command.type}`);
        }
        await handler.handle(command);
    }
}
