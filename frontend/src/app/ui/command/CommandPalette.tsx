import { useEffect, useState } from "react"
import { executeCommand } from "../../../services/commandAPI"

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const run = async () => {
    const res = await executeCommand({
      type: "SYSTEM.EXECUTE",
      payload: input,
    })
    setResult(res)
  }

  if (!open) return null

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }}>
      <div style={{
        width: "500px",
        background: "#111",
        padding: "16px",
        borderRadius: "8px"
      }}>
        <input
          style={{ width: "100%", padding: "10px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
        />

        <button onClick={run} style={{ marginTop: 10 }}>
          EXECUTE
        </button>

        {result && (
          <pre style={{ marginTop: 10, color: "#0f0" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
