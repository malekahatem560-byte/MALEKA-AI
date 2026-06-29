export default function StudioTopBar(){

const item={
padding:"8px 14px",
cursor:"pointer",
borderRadius:8,
fontSize:13,
fontWeight:600,
color:"#d6e4ff"
} as const

return(

<div style={{

height:52,

display:"flex",

alignItems:"center",

justifyContent:"space-between",

padding:"0 18px",

background:"rgba(12,16,24,.95)",

borderBottom:"1px solid rgba(255,255,255,.08)",

backdropFilter:"blur(18px)"

}}>

<div style={{
display:"flex",
gap:8
}}>

<div style={item}>FILE</div>
<div style={item}>EDIT</div>
<div style={item}>VIEW</div>
<div style={item}>WINDOW</div>
<div style={item}>AI</div>
<div style={item}>RENDER</div>

</div>

<div style={{
fontWeight:700,
letterSpacing:2,
color:"#7fdcff"
}}>
MALEKA STUDIO
</div>

<div style={{
display:"flex",
gap:8
}}>

<div style={item}>CPU</div>
<div style={item}>GPU</div>
<div style={item}>MEMORY</div>

</div>

</div>

)

}
