import type { ReactNode } from "react"

export default function DockLayout({
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
gridTemplateColumns:"260px 1fr 340px",
gridTemplateRows:"1fr 260px",
height:"calc(100vh - 52px)",
gap:1,
background:"#090b10"
}}>

<div style={{
overflow:"auto",
borderRight:"1px solid rgba(255,255,255,.08)"
}}>
{left}
</div>

<div style={{
overflow:"hidden",
position:"relative"
}}>
{center}
</div>

<div style={{
overflow:"auto",
borderLeft:"1px solid rgba(255,255,255,.08)"
}}>
{right}
</div>

<div style={{
gridColumn:"1 / span 3",
borderTop:"1px solid rgba(255,255,255,.08)",
overflow:"auto"
}}>
{bottom}
</div>

</div>

)

}
