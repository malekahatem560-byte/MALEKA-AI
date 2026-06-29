import type { ReactNode } from "react"
import { theme } from "../tokens/theme"

export default function Panel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      background: theme.colors.panel,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: 12,
      padding: 16,
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    }}>
      {children}
    </div>
  )
}
