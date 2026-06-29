import { useState } from "react"

export default function AgentStream() {
  const [logs, setLogs] = useState<string[]>([])

  const run = (cmd: string) => {
    setLogs((l) => [...l, `> ${cmd}`])

    setTimeout(() => {
      setLogs((l) => [...l, "[ANALYZE] running"])
    }, 400)

    setTimeout(() => {
      setLogs((l) => [...l, "[PROCESS] executing"])
    }, 900)

    setTimeout(() => {
      setLogs((l) => [...l, "[DECIDE] completed"])
    }, 1400)
  }

  return { logs, run }
}
