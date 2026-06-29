import { useEffect, useState } from "react"
import { eventBus } from "../../core/events/eventBus"
import { memoryGraph } from "../../core/memory/memoryGraph"
import CommandPalette from "../ui/command/CommandPalette"

export default function Level4Dashboard() {

  const [events, setEvents] = useState<any[]>([])
  const [graph, setGraph] = useState<any>({ nodes: [], edges: [] })

  function refresh() {
    setGraph(memoryGraph.getAll())
    setEvents(eventBus.getHistory())
  }

  useEffect(() => {
    eventBus.on(() => refresh())
    refresh()

    const i = setInterval(refresh, 1000)
    return () => clearInterval(i)
  }, [])

  return (
    <div style={{
      display:"grid",
      gridTemplateColumns:"260px 1fr 320px",
      height:"100vh",
      background:"#05070a",
      color:"#fff",
      fontFamily:"system-ui"
    }}>

      <div style={{ borderRight:"1px solid #1f2a36", padding:12 }}>
        <h3>EVENT STREAM</h3>

        <div style={{ marginTop:10, fontSize:11 }}>
          {events.slice(-10).map((e, i) => (
            <div key={i}>{e.type}</div>
          ))}
        </div>
      </div>

      <div style={{ padding:20 }}>
        <h2>LEVEL 4 RUNTIME GRAPH</h2>

        <div style={{ marginTop:20 }}>
          <div>NODES: {graph.nodes.length}</div>
          <div>EDGES: {graph.edges.length}</div>
        </div>
      </div>

      <div style={{ borderLeft:"1px solid #1f2a36", padding:12 }}>
        <h4>MEMORY SNAPSHOT</h4>

        <pre style={{ fontSize:10 }}>
          {JSON.stringify(graph, null, 2)}
        </pre>
      </div>

      <CommandPalette />
    </div>
  )
}
