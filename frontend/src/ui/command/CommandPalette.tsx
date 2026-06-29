import { runCommand } from "../runtime/executionBridge"
import { useEffect, useState } from "react"

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [cmd, setCmd] = useState("")

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const run = () => {
    runCommand(cmd)
    setCmd("")
    setOpen(false)
  }

  if (!open) return null

  return (
    <div style={{
      position: "fixed",
      top: "20%",
      left: "50%",
      transform: "translateX(-50%)",
      width: 400,
      background: "#0c111a",
      border: "1px solid #1a2433",
      padding: 12,
      borderRadius: 10,
      zIndex: 9999,
    }}>
      <input
        autoFocus
        value={cmd}
        onChange={(e) => setCmd(e.target.value)}
        placeholder="Enter command..."
        style={{
          width: "100%",
          padding: 10,
          background: "#05070d",
          border: "1px solid #1a2433",
          color: "#fff",
        }}
      />

      <button onClick={run} style={{ marginTop: 10 }}>
        EXECUTE
      </button>
    </div>
  )
}
