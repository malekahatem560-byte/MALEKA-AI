import type { ReactNode } from "react"

type Props={
left:ReactNode
center:ReactNode
right:ReactNode
bottom:ReactNode
}

export default function DockLayout(props:Props){

return(

<div
style={{

display:"grid",

gridTemplateColumns:"280px 1fr 340px",

gridTemplateRows:"1fr 220px",

gap:10,

height:"100%"

}}

>

<div style={panel}>
{props.left}
</div>

<div style={panel}>
{props.center}
</div>

<div style={panel}>
{props.right}
</div>

<div
style={{
...panel,
gridColumn:"1 / span 3"
}}
>
{props.bottom}
</div>

</div>

)

}

const panel={

background:"rgba(12,17,26,.92)",

border:"1px solid rgba(255,255,255,.08)",

borderRadius:16,

overflow:"hidden",

backdropFilter:"blur(20px)"

} as const

