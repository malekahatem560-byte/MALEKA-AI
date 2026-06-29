import { useState } from "react"
import { kernelAPI } from "../../../services/kernelAPI"

export default function KernelPanel() {
  const [snapshot, setSnapshot] = useState<any>(null)

  return (
    <div style={{
      padding: 16,
      border: "1px solid #1f2a36",
      background: "#0b0f14",
      color: "#fff"
    }}>
      <h3>CONTROL KERNEL</h3>

      <button onClick={() => kernelAPI.pause()}>PAUSE</button>
      <button onClick={() => kernelAPI.resume()}>RESUME</button>

      <button onClick={() => setSnapshot(kernelAPI.snapshot())}>
        SNAPSHOT
      </button>

      <button onClick={() => kernelAPI.replay()}>
        REPLAY
      </button>

      {snapshot && (
        <pre style={{ fontSize: 11, marginTop: 10 }}>
          {JSON.stringify(snapshot, null, 2)}
        </pre>
      )}
    </div>
  )
}
