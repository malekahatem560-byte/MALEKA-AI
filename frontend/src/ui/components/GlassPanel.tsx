import { uiTheme } from "../theme/uiTheme"
import type { ReactNode } from "react"

export default function GlassPanel({ children, title }: { children: ReactNode, title?: string }) {
  return (
    <div style={{
      background: uiTheme.panel,
      border: `1px solid ${uiTheme.border}`,
      borderRadius: 14,
      padding: 14,
      color: uiTheme.text,
      boxShadow: uiTheme.glow,
      backdropFilter: "blur(12px)",
      marginBottom: 12
    }}>
      {title && (
        <div style={{
          fontSize: 12,
          color: uiTheme.muted,
          marginBottom: 8,
          letterSpacing: 1
        }}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
