import { useEffect, useState } from "react"
import { eventBus } from "../../core/events/eventBus"

export function useEventStream(filter?: string) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const unsub = eventBus.on((e: any) => {
      if (!filter || e.type === filter) {
        setData((prev) => [e, ...prev].slice(0, 50))
      }
    })

    return () => {
      unsub()
    }
  }, [filter])

  return data
}
