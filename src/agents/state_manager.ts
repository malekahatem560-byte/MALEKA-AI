export class StateManager {
    private state: Record<string, any> = {};

    public getCurrent(): any {
        return this.state;
    }

    public update(key: string, value: any): void {
        this.state[key] = value;
    }
}
