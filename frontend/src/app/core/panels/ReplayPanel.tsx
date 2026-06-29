import { useEffect, useState } from "react"
import { eventBus } from "../../../core/events/eventBus"

export default function ReplayPanel() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    setEvents(eventBus.getHistory())

    const interval = setInterval(() => {
      setEvents(eventBus.getHistory())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      padding: 16,
      border: "1px solid #1f2a36",
      borderRadius: 8,
      background: "#0b0f14",
      height: "100%",
      overflow: "auto"
    }}>
      <h3>EVENT REPLAY STREAM</h3>

      {events.map((e, i) => (
        <div key={i} style={{
          fontSize: 12,
          padding: 6,
          marginBottom: 6,
          background: "#111826"
        }}>
          <div>{e.type}</div>
          <div style={{ opacity: 0.6 }}>
            {new Date(e.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  )
}
