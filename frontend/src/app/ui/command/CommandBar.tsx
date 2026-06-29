import { useState } from "react"

export default function CommandBar({
  onRun
}: {
  onRun: (cmd: string) => void
}) {
  const [value, setValue] = useState("")

  return (
    <div style={{
      display: "flex",
      gap: 10,
      padding: 12,
      borderTop: "1px solid rgba(255,255,255,0.1)"
    }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter command..."
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 10,
          background: "rgba(0,0,0,0.3)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      />

      <button
        onClick={() => {
          onRun(value)
          setValue("")
        }}
        style={{
          padding: "10px 16px",
          borderRadius: 10,
          background: "#4da3ff",
          color: "#000",
          fontWeight: 600
        }}
      >
        RUN
      </button>
    </div>
  )
}
