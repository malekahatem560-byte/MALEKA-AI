import { useEffect, useState } from "react"
import { eventBus } from "../../../core/events/eventBus"

export type ExecutionEvent = {
  type: "START" | "RESULT"
  payload: any
  ts: number
}

export function useExecutionStream() {
  const [events, setEvents] = useState<ExecutionEvent[]>([])

  useEffect(() => {
    const push = (type: ExecutionEvent["type"]) => (payload: any) => {
      setEvents(prev => [
        ...prev,
        { type, payload, ts: Date.now() }
      ])
    }

    const offStart = eventBus.on("EXECUTION.START", push("START"))
    const offResult = eventBus.on("EXECUTION.RESULT", push("RESULT"))

    return () => {
      offStart?.()
      offResult?.()
    }
  }, [])

  return events
}
