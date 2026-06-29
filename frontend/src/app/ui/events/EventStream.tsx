import { useEffect } from "react"
import { eventBus } from "../../../core/events/eventBus"

export default function EventStream() {

  useEffect(() => {
    const unsub = eventBus.on((event: any) => {
      console.log("EVENT:", event)
    })

    return () => {
      unsub()
    }
  }, [])

  return null
}
