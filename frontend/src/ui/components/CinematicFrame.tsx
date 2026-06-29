import type { ReactNode } from "react"
import { cinematicTheme } from "../theme/cinematicTheme"
import { motion } from "../theme/motion"

export default function CinematicFrame({ children }: { children: ReactNode }) {
  return (
    <div style={{
      transition: `all ${motion.medium} ${motion.easing}`,
      transform: "translateZ(0)",
      background: cinematicTheme.panel,
      border: `1px solid ${cinematicTheme.border}`,
      borderRadius: 14,
      boxShadow: cinematicTheme.glow,
      backdropFilter: "blur(18px)",
      padding: 12
    }}>
      {children}
    </div>
  )
}
