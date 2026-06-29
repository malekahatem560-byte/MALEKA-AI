export class ReplayGuard {
    private active = false;

    public begin(): void {
        this.active = true;
    }

    public end(): void {
        this.active = false;
    }

    public isActive(): boolean {
        return this.active;
    }
}
