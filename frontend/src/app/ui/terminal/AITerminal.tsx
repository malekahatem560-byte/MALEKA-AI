import { useEffect, useState } from "react"
import { createStream } from "../../../core/runtime/streamEngine"

const stream = createStream()

export default function AITerminal() {
  const [logs, setLogs] = useState<string[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    stream.subscribe((e) => {
      setLogs(l => [...l, e.message])
    })
  }, [])

  const run = () => {
    stream.run(input)
    setInput("")
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: 12,
      fontFamily: "monospace"
    }}>
      
      <div style={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: 12
      }}>
        {logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: 10,
            background: "#111",
            color: "#fff",
            border: "1px solid #333"
          }}
        />

        <button onClick={run}>
          EXEC
        </button>
      </div>
    </div>
  )
}
