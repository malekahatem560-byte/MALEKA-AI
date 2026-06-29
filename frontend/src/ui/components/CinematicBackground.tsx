export default function CinematicBackground() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: `
        radial-gradient(circle at 20% 20%, rgba(78,161,255,0.12), transparent 40%),
        radial-gradient(circle at 80% 60%, rgba(120,90,255,0.08), transparent 50%),
        #05070d
      `,
      zIndex: 0
    }} />
  )
}
