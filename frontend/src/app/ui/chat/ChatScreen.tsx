import { useState } from "react"
import CommandBar from "../command/CommandBar"

export default function ChatScreen() {
  const [logs, setLogs] = useState<string[]>([])

  const run = (cmd: string) => {
    setLogs((l) => [...l, `> ${cmd}`])

    setTimeout(() => {
      setLogs((l) => [...l, "[ANALYZE] OK"])
    }, 300)

    setTimeout(() => {
      setLogs((l) => [...l, "[PROCESS] OK"])
    }, 700)

    setTimeout(() => {
      setLogs((l) => [...l, "[DECIDE] DONE"])
    }, 1100)
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      
      <div style={{ flex: 1, padding: 12, overflowY: "auto" }}>
        {logs.map((l, i) => (
          <div key={i} style={{
            fontFamily: "monospace",
            padding: 4,
            color: "#e8eefc"
          }}>
            {l}
          </div>
        ))}
      </div>

      <CommandBar onRun={run} />
    </div>
  )
}
