export default function TopBar() {
  return (
    <div style={{
      height: 50,
      borderBottom: "1px solid #1a2433",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      justifyContent: "space-between",
    }}>
      <div>CONTROL KERNEL</div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        LEVEL 4 UI SYSTEM
      </div>
    </div>
  )
}
