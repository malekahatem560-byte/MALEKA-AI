
import { useEffect, useRef, useState } from "react"
import { eventBus } from "../../core/events/eventBus"

type Node = { id: string; x: number; y: number }
type Edge = { from: string; to: string }

export default function ExecutionGraphPanel() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const draggingNode = useRef<string | null>(null)
  const panRef = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (event: any) => {
      if (!event?.step) return

      setNodes((prev) => {
        if (prev.find(n => n.id === event.step)) return prev

        return [
          ...prev,
          {
            id: event.step,
            x: 100 + prev.length * 120,
            y: 100 + prev.length * 80
          }
        ]
      })

      if (event.success !== undefined) {
        setEdges((prev) => [
          ...prev,
          { from: event.step, to: event.success ? "SUCCESS" : "FAIL" }
        ])
      }
    }

    eventBus.on(handler)
  }, [])

  const onWheel = (e: any) => {
    e.preventDefault()
    setScale((s) => Math.max(0.5, Math.min(2, s - e.deltaY * 0.001)))
  }

  const onMouseDown = (e: any) => {
    panRef.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
  }

  const onMouseMove = (e: any) => {
    if (panRef.current) {
      setOffset((o) => ({
        x: o.x + (e.clientX - lastPos.current.x),
        y: o.y + (e.clientY - lastPos.current.y)
      }))
      lastPos.current = { x: e.clientX, y: e.clientY }
    }

    if (draggingNode.current) {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === draggingNode.current
            ? {
                ...n,
                x: e.clientX / scale,
                y: e.clientY / scale
              }
            : n
        )
      )
    }
  }

  const onMouseUp = () => {
    panRef.current = false
    draggingNode.current = null
  }

  return (
    <div
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{
        padding: 12,
        background: "#070a0f",
        height: "100%",
        overflow: "hidden",
        cursor: "grab"
      }}
    >
      <h3 style={{ color: "#66ffb3" }}>INTERACTIVE EXECUTION GRAPH</h3>

      <svg width="100%" height="600">
        <g transform={`translate(${offset.x},${offset.y}) scale(${scale})`}>

          {edges.map((e, i) => {
            const from = nodes.find(n => n.id === e.from)
            const to = nodes.find(n => n.id === e.to)

            if (!from || !to) return null

            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#555"
              />
            )
          })}

          {nodes.map((n) => (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={18}
                fill="#00ff88"
                onMouseDown={() => (draggingNode.current = n.id)}
              />
              <text x={n.x + 20} y={n.y} fill="#fff">
                {n.id}
              </text>
            </g>
          ))}

        </g>
      </svg>
    </div>
  )
}
