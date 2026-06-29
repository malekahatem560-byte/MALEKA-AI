import type { ReactNode } from "react"
import { theme } from "../system/theme"

export default function Glass({ children }: { children: ReactNode }) {
  return (
    <div style={{
      background: theme.panel,
      border: `1px solid ${theme.border}`,
      borderRadius: 16,
      backdropFilter: "blur(18px)",
      padding: 16,
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
    }}>
      {children}
    </div>
  )
}
