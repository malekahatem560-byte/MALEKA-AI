import type { ReactNode } from "react"

export function UIKernel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      background: "radial-gradient(circle at top, #0b1220, #05070d)",
      color: "#e8eefc",
      fontFamily: "system-ui",
      display: "grid",
      gridTemplateColumns: "260px 1fr 260px",
    }}>
      {children}
    </div>
  )
}
