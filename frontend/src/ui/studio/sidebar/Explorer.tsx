const items=[
"Projects",
"Scenes",
"Assets",
"Memory",
"Agents",
"Pipelines",
"Telemetry",
"Replay"
]

export default function Explorer(){

return(
<div style={{
height:"100%",
padding:18,
background:"#111827",
borderRadius:16,
border:"1px solid rgba(255,255,255,.08)"
}}>

<div style={{
color:"#EEF4FF",
fontWeight:700,
marginBottom:18
}}>
EXPLORER
</div>

{items.map(x=>(
<div key={x}
style={{
padding:"10px 12px",
marginBottom:8,
borderRadius:10,
color:"#B8CAE8",
cursor:"pointer",
background:"rgba(255,255,255,.02)"
}}>
{x}
</div>
))}

</div>
)
}
