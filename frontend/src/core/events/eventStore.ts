type Event = {
  type: string
  data?: any
  timestamp: number
}

class EventStore {
  private history: Event[] = []

  record(event: Event) {
    this.history.push(event)
    if (this.history.length > 1000) this.history.shift()
  }

  getHistory() {
    return [...this.history]
  }

  clear() {
    this.history = []
  }
}

export const eventStore = new EventStore()
