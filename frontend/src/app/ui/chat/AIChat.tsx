import { useState } from "react"
import Glass from "../../../ui/components/Glass"
import { theme } from "../../../ui/system/theme"

export default function AIChat() {
  const [logs, setLogs] = useState<string[]>([])
  const [input, setInput] = useState("")

  const run = () => {
    const cmd = input
    setInput("")

    setLogs(l => [...l, `> ${cmd}`])

    setTimeout(() => {
      setLogs(l => [...l, "[ANALYZER] parsing command"])
    }, 200)

    setTimeout(() => {
      setLogs(l => [...l, "[ENGINE] executing agents"])
    }, 600)

    setTimeout(() => {
      setLogs(l => [...l, "[RESULT] completed ✔"])
    }, 1100)
  }

  return (
    <Glass>
      <div style={{
        height: "60vh",
        overflowY: "auto",
        fontFamily: "monospace",
        fontSize: 13
      }}>
        {logs.map((l, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            {l}
          </div>
        ))}
      </div>

      <div style={{
        display: "flex",
        gap: 10,
        marginTop: 12
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Run system command..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            border: `1px solid ${theme.border}`,
            background: "rgba(0,0,0,0.3)",
            color: theme.text
          }}
        />

        <button
          onClick={run}
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            background: theme.accent,
            border: "none",
            fontWeight: 600
          }}
        >
          EXEC
        </button>
      </div>
    </Glass>
  )
}
