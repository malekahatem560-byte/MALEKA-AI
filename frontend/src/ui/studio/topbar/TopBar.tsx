export default function TopBar() {
  return (
    <div style={{
      height:"100%",
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      padding:"0 24px",
      background:"linear-gradient(180deg,#151d2b,#0d131d)",
      border:"1px solid rgba(255,255,255,.08)",
      borderRadius:16
    }}>
      <div style={{
        color:"#EEF4FF",
        fontSize:22,
        fontWeight:700,
        letterSpacing:2
      }}>
        MALEKA STUDIO
      </div>

      <div style={{
        display:"flex",
        gap:18,
        color:"#AFC4E8"
      }}>
        <span>PROJECT</span>
        <span>PIPELINE</span>
        <span>AGENTS</span>
        <span>MEMORY</span>
        <span>RENDER</span>
      </div>

      <div style={{
        color:"#64D2FF",
        fontWeight:700
      }}>
        SYSTEM ONLINE
      </div>
    </div>
  )
}
