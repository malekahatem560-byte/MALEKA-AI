import { useEffect, useState } from "react"
import { memoryGraph } from "../../core/memory/memoryGraph"
import { eventBus } from "../../core/events/eventBus"

export default function MemoryGraphPanel() {
  const [nodes, setNodes] = useState<any[]>([])

  useEffect(() => {
    const update = () => setNodes(memoryGraph.getAll())

    eventBus.on("COMMAND.RUN", (cmd: any) => {
      memoryGraph.add({
        id: Math.random().toString(36).slice(2),
        type: "command",
        data: cmd,
      })
      update()
    })
  }, [])

  return (
    <div style={{
      position: "fixed",
      left: 10,
      bottom: 120,
      width: 320,
      background: "#0c111a",
      border: "1px solid #1a2433",
      padding: 10,
      fontSize: 11,
    }}>
      <div>MEMORY GRAPH</div>

      {nodes.slice(-8).map((n) => (
        <div key={n.id}>
          {n.type}: {String(n.data)}
        </div>
      ))}
    </div>
  )
}
