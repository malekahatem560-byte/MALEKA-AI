
import { useEffect, useState } from "react"
import { eventBus } from "../../core/events/eventBus"
import Panel from "../primitives/Panel"
import LogLine from "../primitives/LogLine"

export default function ExecutionConsolePanel() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const handler = (event: any) => {
      setLogs(prev => [...prev, event])
    }

    eventBus.on(handler)
  }, [])

  return (
    <Panel title="EXECUTION STREAM">
      <div style={{ maxHeight: "70vh", overflow: "auto" }}>
        {logs.map((l, i) => (
          <LogLine key={i} data={l} />
        ))}
      </div>
    </Panel>
  )
}
