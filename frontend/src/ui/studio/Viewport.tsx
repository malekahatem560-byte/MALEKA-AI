export default function Viewport() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: 18,
        border: "1px solid rgba(120,160,255,.18)",
        background:
          "radial-gradient(circle at 50% 35%,#1f2c44 0%,#111722 42%,#090b12 100%)",
        boxShadow:
          "0 0 80px rgba(0,0,0,.45), inset 0 0 80px rgba(80,120,255,.08)"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: .35
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#edf3ff",
            fontSize: 34,
            letterSpacing: 4,
            fontWeight: 700
          }}
        >
          MALEKA
        </h1>

        <div
          style={{
            marginTop: 10,
            color: "#8fa8d8",
            letterSpacing: 2
          }}
        >
          REAL-TIME CINEMATIC ENGINE
        </div>
      </div>
    </div>
  )
}
