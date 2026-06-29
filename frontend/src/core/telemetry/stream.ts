type Listener = (event: any) => void

class TelemetryStream {
  private listeners: Listener[] = []

  emit(event: any) {
    this.listeners.forEach(l => l(event))
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }
}

export const telemetry = new TelemetryStream()
