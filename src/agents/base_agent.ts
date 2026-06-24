export abstract class BaseAgent {
    constructor(public readonly id: string, protected readonly role: string) {}
    public abstract decide(context: any): Promise<void>;
    protected log(msg: string): void { console.log(`[Agent:${this.role}:${this.id}] ${msg}`); }
}
