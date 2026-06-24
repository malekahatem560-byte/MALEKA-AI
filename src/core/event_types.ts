export type EventPayload = { [key: string]: any };
export interface MALEKAEvent {
    type: string;
    payload: EventPayload;
    timestamp: number;
}
