type Listener = (event: any) => void

type EventRecord = {
  type: string
  payload?: any
  timestamp: number
}

class EventBus {
  private listeners: Record<string, Listener[]> = {}
  private history: EventRecord[] = []

  emit(type: string, payload?: any) {
    const event: EventRecord = {
      type,
      payload,
      timestamp: Date.now()
    }

    this.history.push(event)
    if (this.history.length > 1000) this.history.shift()

    const list = this.listeners[type] || []
    list.forEach(l => l(event))

    return event
  }

  on(eventOrListener: any, listener?: any) {
    // CASE 1: legacy listener-only mode
    if (typeof eventOrListener === "function") {
      const fn = eventOrListener
      const type = "*"

      if (!this.listeners[type]) this.listeners[type] = []
      this.listeners[type].push(fn)

      return () => {
        this.listeners[type] =
          this.listeners[type].filter(l => l !== fn)
      }
    }

    // CASE 2: typed event mode
    const event = eventOrListener

    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(listener)

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(l => l !== listener)
    }
  }

  getHistory() {
    return [...this.history]
  }
}

export const unifiedEventBus = new EventBus()
