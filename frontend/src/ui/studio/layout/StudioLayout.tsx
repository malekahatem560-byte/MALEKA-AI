import WindowFrame from "../windows/WindowFrame"
import { useDock } from "../docking/store"

import Explorer from "../sidebar/Explorer"
import Viewport from "../viewport/Viewport"
import Inspector from "../inspector/Inspector"
import Timeline from "../timeline/Timeline"

function renderPanel(id:string,title:string){

const key=(id+" "+title).toLowerCase()

if(key.includes("explorer")) return <Explorer/>

if(key.includes("viewport")) return <Viewport/>

if(key.includes("inspector")) return <Inspector/>

if(key.includes("timeline")) return <Timeline/>

return(
<div style={{
padding:20,
color:"#d7e7ff",
fontFamily:"monospace"
}}>
{title}
</div>
)

}

function Zone({area}:{area:string}){

const panels=useDock()
.filter(p=>p.area===area&&p.visible)

return(

<div
style={{
display:"flex",
flexDirection:area==="BOTTOM"?"row":"column",
gap:8,
padding:8,
height:"100%"
}}
>

{panels.map(panel=>(

<div
key={panel.id}
style={{
flex:1,
display:"flex",
minHeight:0
}}
>

<WindowFrame
id={panel.id}
title={panel.title}
>

{renderPanel(panel.id,panel.title)}

</WindowFrame>

</div>

))}

</div>

)

}

export default function StudioLayout(){

return(

<div
style={{

display:"grid",

gridTemplateColumns:"280px minmax(600px,1fr) 340px",

gridTemplateRows:"1fr 260px",

gap:10,

height:"100vh",

background:"#05070b"

}}
>

<Zone area="LEFT"/>

<Zone area="CENTER"/>

<Zone area="RIGHT"/>

<div style={{gridColumn:"1 / span 3"}}>

<Zone area="BOTTOM"/>

</div>

</div>

)

}
