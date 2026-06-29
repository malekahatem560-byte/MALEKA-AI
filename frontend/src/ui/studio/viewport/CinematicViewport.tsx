export default function CinematicViewport(){

return(

<div style={{

width:"100%",
height:"100%",

display:"flex",
alignItems:"center",
justifyContent:"center",

position:"relative",

overflow:"hidden",

background:`
radial-gradient(circle at center,
#23324b 0%,
#101722 45%,
#06080d 100%)
`

}}>

<div style={{

position:"absolute",
inset:0,

backgroundImage:`
linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)
`,

backgroundSize:"40px 40px"

}}/>

<div style={{

width:"78%",
aspectRatio:"16/9",

borderRadius:18,

border:"1px solid rgba(255,255,255,.12)",

background:"#000",

boxShadow:"0 30px 100px rgba(0,0,0,.65)",

display:"flex",
alignItems:"center",
justifyContent:"center",

color:"#7FDBFF",

fontSize:34,

fontWeight:700,

letterSpacing:2

}}>

MALEKA AI VIEWPORT

</div>

<div style={{

position:"absolute",

top:20,

left:20,

display:"flex",

gap:10

}}>

{["LIVE","GPU","AI","4K"].map(x=>

<div
key={x}
style={{

padding:"6px 12px",

borderRadius:999,

background:"rgba(0,0,0,.45)",

border:"1px solid rgba(255,255,255,.08)",

fontSize:12,

color:"#EDF4FF"

}}

>

{x}

</div>

)}

</div>

</div>

)

}
