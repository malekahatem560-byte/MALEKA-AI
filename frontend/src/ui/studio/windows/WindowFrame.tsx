import { useRef } from "react"

export default function WindowFrame({ id, title, children, onMove, onResize }: any) {
  const ref = useRef<HTMLDivElement>(null)

  const startDrag = (e: any) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const sx = e.clientX
    const sy = e.clientY

    const move = (ev: any) => {
      el.style.position = "absolute"
      el.style.left = rect.left + (ev.clientX - sx) + "px"
      el.style.top = rect.top + (ev.clientY - sy) + "px"
      el.style.zIndex = "999"
    }

    const up = () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
      if (onMove) onMove(id, el)
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
  }

  const startResize = (_e: any) => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()

    const move = (ev: any) => {
      el.style.width = rect.width + (ev.clientX - rect.right) + "px"
      el.style.height = rect.height + (ev.clientY - rect.bottom) + "px"
    }

    const up = () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
      if (onResize) onResize(id, el)
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
  }

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        minWidth: 220,
        minHeight: 120,
        background: "#0b111a",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        overflow: "hidden"
      }}
    >
      <div
        onMouseDown={startDrag}
        style={{
          padding: 8,
          cursor: "grab",
          background: "#111a26",
          color: "#00ff88",
          fontSize: 12,
          userSelect: "none"
        }}
      >
        {title}
      </div>

      <div style={{ padding: 10 }}>{children}</div>

      <div
        onMouseDown={startResize}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: 12,
          height: 12,
          background: "rgba(255,255,255,0.2)",
          cursor: "nwse-resize"
        }}
      />
    </div>
  )
}
