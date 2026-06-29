import { useEffect, useState } from "react"
import { timeEngine } from "../../../core/time/timeEngine"

export default function TimeScrubber() {
  const [timeline, setTimeline] = useState<any[]>([])
  const [position, setPosition] = useState(0)

  useEffect(() => {
    setTimeline(timeEngine.getTimeline())
    setPosition(timeEngine.getPosition())
  }, [])

  const handleSeek = (e: any) => {
    const v = Number(e.target.value)
    timeEngine.seek(v)
    setPosition(v)
  }

  return (
    <div style={{ padding: 12, border: "1px solid #222" }}>
      <div>TIME POSITION: {position}</div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleSeek}
      />

      <div style={{ marginTop: 10 }}>
        EVENTS: {timeline.length}
      </div>
    </div>
  )
}
