export interface Query<T = any> {
    type: string;
    payload?: any;
}

export interface QueryHandler<T extends Query, R> {
    execute(query: T): Promise<R>;
}

export class QueryBus {
    private handlers: Map<string, QueryHandler<any, any>> = new Map();

    public register<T extends Query, R>(queryType: string, handler: QueryHandler<T, R>): void {
        this.handlers.set(queryType, handler);
    }

    public async execute<T extends Query, R>(query: T): Promise<R> {
        const handler = this.handlers.get(query.type);
        if (!handler) {
            throw new Error(`No handler registered for query: ${query.type}`);
        }
        return await handler.execute(query);
    }
}
