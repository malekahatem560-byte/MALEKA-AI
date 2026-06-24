export class SharedMemory {
    private state: Map<string, any> = new Map();
    public set(key: string, value: any) { this.state.set(key, value); }
    public get(key: string) { return this.state.get(key); }
}
