import { useState } from "react"
import { replayEngine } from "../../core/replay/replayEngine"

export default function ReplayPanel() {
  const [index, setIndex] = useState(0)

  const snapshot = replayEngine.getSnapshot(index)

  return (
    <div style={{
      position: "fixed",
      right: 10,
      top: 120,
      width: 320,
      background: "#0c111a",
      border: "1px solid #1a2433",
      padding: 10,
      fontSize: 11,
    }}>
      <div>REPLAY ENGINE</div>

      <input
        type="range"
        min="0"
        max={replayEngine.getLength()}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
      />

      <div style={{ marginTop: 10 }}>
        {snapshot.slice(-6).map((n: any, i: number) => (
          <div key={i}>
            {n.type}: {String(n.data)}
          </div>
        ))}
      </div>
    </div>
  )
}
