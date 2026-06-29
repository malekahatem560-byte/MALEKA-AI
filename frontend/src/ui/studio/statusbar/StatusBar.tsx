export default function StatusBar(){

return(
<div style={{
height:"100%",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 16px",
background:"#0B1017",
borderRadius:12,
border:"1px solid rgba(255,255,255,.06)",
color:"#8EA3C2",
fontSize:12
}}>

<div>READY</div>

<div>GPU • MEMORY • EVENT BUS • RUNTIME</div>

</div>
)
}
