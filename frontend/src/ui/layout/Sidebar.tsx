export default function Sidebar({ active, setActive }: any) {
  const items = ["dashboard", "system", "memory", "replay"]

  return (
    <div style={{
      width: 220,
      borderRight: "1px solid #1a2433",
      padding: 12,
    }}>
      <h3>MALEKA</h3>

      {items.map((i) => (
        <div
          key={i}
          onClick={() => setActive(i)}
          style={{
            padding: 10,
            margin: "6px 0",
            cursor: "pointer",
            background: active === i ? "#111a2a" : "transparent",
            borderRadius: 8,
          }}
        >
          {i.toUpperCase()}
        </div>
      ))}
    </div>
  )
}
