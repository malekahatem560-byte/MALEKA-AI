type Handler = (payload?: any) => void;

export class EventBus {
  private handlers: Map<string, Handler[]> = new Map();

  public on(event: string, handler: Handler): void {
    const list = this.handlers.get(event) || [];
    list.push(handler);
    this.handlers.set(event, list);
  }

  public off(event: string, handler: Handler): void {
    const list = this.handlers.get(event);
    if (!list) return;
    this.handlers.set(event, list.filter(h => h !== handler));
  }

  public emit(event: string, payload?: any): void {
    const list = this.handlers.get(event);
    if (!list) return;
    for (const h of list) h(payload);
  }
}
