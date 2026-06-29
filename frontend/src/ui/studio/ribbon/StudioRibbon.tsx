const groups=[
{
title:"PROJECT",
items:["New","Open","Save","Export"]
},
{
title:"AI",
items:["Analyze","Plan","Execute","Agents"]
},
{
title:"MEMORY",
items:["Graph","Replay","Timeline","Snapshot"]
},
{
title:"RENDER",
items:["Preview","Queue","Render","Publish"]
},
{
title:"SYSTEM",
items:["Kernel","Events","Logs","Settings"]
}
]

export default function StudioRibbon(){

return(

<div style={{

display:"flex",

gap:18,

padding:"12px 18px",

background:"linear-gradient(180deg,#111927,#0B1018)",

borderBottom:"1px solid rgba(255,255,255,.08)",

overflowX:"auto"

}}>

{groups.map(group=>(

<div
key={group.title}
style={{

display:"flex",

flexDirection:"column",

paddingRight:18,

borderRight:"1px solid rgba(255,255,255,.08)"

}}

>

<div style={{

fontSize:11,

fontWeight:700,

letterSpacing:1.2,

color:"#8FA5C5",

marginBottom:8

}}>

{group.title}

</div>

<div style={{

display:"flex",

gap:8,

flexWrap:"wrap"

}}>

{group.items.map(item=>(

<button
key={item}
style={{

padding:"10px 14px",

borderRadius:10,

border:"1px solid rgba(255,255,255,.08)",

background:"#172233",

color:"#EDF4FF",

cursor:"pointer",

fontWeight:600

}}

>

{item}

</button>

))}

</div>

</div>

))}

</div>

)

}
