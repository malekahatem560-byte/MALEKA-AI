import { useEffect, useState } from "react"
import { memoryGraph } from "../../../core/memory/memoryGraph"

export default function MemoryPanel() {
  const [nodes, setNodes] = useState<any[]>([])

  useEffect(() => {
    const update = () => setNodes(memoryGraph.getAll())

    update()
    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      padding: 16,
      border: "1px solid #1f2a36",
      borderRadius: 8,
      background: "#0b0f14",
      height: "100%",
      overflow: "auto"
    }}>
      <h3>MEMORY GRAPH</h3>

      {nodes.slice(-20).map((n, i) => (
        <div key={i} style={{
          fontSize: 12,
          padding: 6,
          marginBottom: 6,
          background: "#111826"
        }}>
          <div>{n.type}</div>
        </div>
      ))}
    </div>
  )
}
