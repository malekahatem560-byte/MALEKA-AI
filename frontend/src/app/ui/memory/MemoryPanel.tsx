import { useEffect, useState } from "react"
import { executionGateway } from "../../../core/gateway/execution_gateway"

type MemorySnapshot = {
  nodes: any[]
  edges: any[]
}

export default function MemoryPanel() {
  const [memory, setMemory] = useState<MemorySnapshot>({
    nodes: [],
    edges: [],
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setMemory(executionGateway.getMemory() as any)
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ padding: 10 }}>
      <h3>MEMORY</h3>

      {memory.nodes.slice(-10).map((node, index) => (
        <pre key={index} style={{ fontSize: 11 }}>
          {JSON.stringify(node, null, 2)}
        </pre>
      ))}
    </div>
  )
}
