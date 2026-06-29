import type { ReactNode } from "react"
import { cinematicTheme } from "../theme/cinematicTheme"

export default function CinematicPanel({
  children,
  title
}: {
  children: ReactNode
  title?: string
}) {
  return (
    <div style={{
      background: cinematicTheme.panel,
      border: `1px solid ${cinematicTheme.border}`,
      boxShadow: cinematicTheme.glow,
      backdropFilter: "blur(18px)",
      borderRadius: 16,
      padding: 14,
      marginBottom: 12,
      transition: "all 0.3s ease"
    }}>
      {title && (
        <div style={{
          fontSize: 11,
          letterSpacing: 2,
          color: cinematicTheme.muted,
          marginBottom: 10,
          textTransform: "uppercase"
        }}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}
