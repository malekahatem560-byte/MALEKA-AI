import type { ReactNode } from "react"

type PanelProps={
title:string
children:ReactNode
}

function Panel({title,children}:PanelProps){

return(

<section
style={{

display:"flex",
flexDirection:"column",

background:
"linear-gradient(180deg,#111926,#0c1119)",

border:"1px solid rgba(255,255,255,.08)",

borderRadius:18,

overflow:"hidden",

boxShadow:
"0 10px 40px rgba(0,0,0,.35)"

}}

>

<header
style={{

height:42,

display:"flex",

alignItems:"center",

padding:"0 16px",

fontWeight:700,

fontSize:13,

letterSpacing:1,

color:"#EDF4FF",

borderBottom:"1px solid rgba(255,255,255,.06)"

}}

>

{title}

</header>

<div
style={{
flex:1,
overflow:"auto"
}}
>

{children}

</div>

</section>

)

}

export default function LayoutManager({

explorer,

viewport,

inspector,

timeline

}:{

explorer:ReactNode

viewport:ReactNode

inspector:ReactNode

timeline:ReactNode

}){

return(

<div

style={{

display:"grid",

gridTemplateColumns:"300px 1fr 360px",

gridTemplateRows:"1fr 240px",

gap:12,

height:"100%"

}}

>

<Panel title="EXPLORER">

{explorer}

</Panel>

<Panel title="VIEWPORT">

{viewport}

</Panel>

<Panel title="INSPECTOR">

{inspector}

</Panel>

<div style={{gridColumn:"1 / span 3"}}>

<Panel title="TIMELINE">

{timeline}

</Panel>

</div>

</div>

)

}
