import { useEffect, useState } from "react"
import { eventBus } from "../../core/events/eventBus"

type BusEvent = {
  type: string
  payload?: unknown
  timestamp: number
}

export default function TelemetryPanel() {
  const [events, setEvents] = useState<BusEvent[]>([])

  useEffect(() => {
    const unsubscribe = eventBus.on((event: BusEvent) => {
      setEvents(prev => [event, ...prev].slice(0, 50))
    })

    return unsubscribe
  }, [])

  return (
    <div className="telemetry-panel">
      {events.map((e, i) => (
        <div key={i} className="telemetry-row">
          <span>{e.type}</span>
          <span>{new Date(e.timestamp).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  )
}
