import type { ReactNode } from "react"

export default function StudioShell({
left,
center,
right,
bottom
}:{
left:ReactNode
center:ReactNode
right:ReactNode
bottom:ReactNode
}){

return(

<div style={{

display:"grid",

gridTemplateColumns:"320px 1fr 340px",

gridTemplateRows:"1fr 220px",

height:"100vh",

background:"#06070b",

gap:14,

padding:14,

boxSizing:"border-box"

}}>

<div style={{
overflow:"hidden",
borderRadius:18,
background:"#11161f"
}}>
{left}
</div>

<div style={{
overflow:"hidden",
borderRadius:18,
background:"#0d1017"
}}>
{center}
</div>

<div style={{
overflow:"hidden",
borderRadius:18,
background:"#11161f"
}}>
{right}
</div>

<div style={{
gridColumn:"1 / span 3",
overflow:"hidden",
borderRadius:18,
background:"#090d13"
}}>
{bottom}
</div>

</div>

)

}
