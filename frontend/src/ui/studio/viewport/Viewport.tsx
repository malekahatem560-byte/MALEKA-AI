import { useEffect, useRef, useState } from "react"

export default function Viewport(){

const canvas=useRef<HTMLCanvasElement>(null)

const [fps,setFps]=useState(60)
const [time,setTime]=useState("")
const [zoom]=useState("100%")

useEffect(()=>{

const clock=setInterval(()=>{
setTime(new Date().toLocaleTimeString())
},1000)

return()=>clearInterval(clock)

},[])

useEffect(()=>{

const c=canvas.current
if(!c)return

const ctx=c.getContext("2d")
if(!ctx)return

let w=0
let h=0
let frame=0
let last=performance.now()
let tick=0

const resize=()=>{

w=c.clientWidth
h=c.clientHeight

c.width=w*devicePixelRatio
c.height=h*devicePixelRatio

ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)

}

resize()

window.addEventListener("resize",resize)

let id=0

const render=()=>{

tick+=0.01

ctx.fillStyle="#090d13"
ctx.fillRect(0,0,w,h)

ctx.strokeStyle="rgba(255,255,255,.05)"

for(let x=0;x<w;x+=40){

ctx.beginPath()
ctx.moveTo(x,0)
ctx.lineTo(x,h)
ctx.stroke()

}

for(let y=0;y<h;y+=40){

ctx.beginPath()
ctx.moveTo(0,y)
ctx.lineTo(w,y)
ctx.stroke()

}

ctx.strokeStyle="#4fd8ff"
ctx.lineWidth=3

ctx.beginPath()
ctx.arc(
w/2,
h/2,
120+Math.sin(tick)*12,
0,
Math.PI*2
)
ctx.stroke()

ctx.beginPath()
ctx.moveTo(w/2-25,h/2)
ctx.lineTo(w/2+25,h/2)
ctx.moveTo(w/2,h/2-25)
ctx.lineTo(w/2,h/2+25)
ctx.stroke()

ctx.fillStyle="#ffffff"
ctx.font="700 24px sans-serif"
ctx.fillText("MALEKA STUDIO",32,42)

ctx.font="13px monospace"
ctx.fillStyle="#8fd8ff"
ctx.fillText("Viewport Online",32,66)

frame++

const now=performance.now()

if(now-last>=1000){

setFps(frame)
frame=0
last=now

}

id=requestAnimationFrame(render)

}

render()

return()=>{

cancelAnimationFrame(id)
window.removeEventListener("resize",resize)

}

},[])

return(

<div style={{
width:"100%",
height:"100%",
position:"relative",
borderRadius:18,
overflow:"hidden",
background:"#090d13",
border:"1px solid rgba(255,255,255,.08)"
}}>

<div style={{
position:"absolute",
left:0,
right:0,
top:0,
height:46,
display:"flex",
alignItems:"center",
gap:8,
padding:"0 14px",
background:"rgba(8,12,18,.82)",
backdropFilter:"blur(12px)",
borderBottom:"1px solid rgba(255,255,255,.06)",
zIndex:5
}}>

{["FILE","EDIT","VIEW","BUILD","RUN","STOP","AI"].map(x=>

<button
key={x}
style={{
background:"#152132",
color:"#dfefff",
border:"1px solid rgba(255,255,255,.08)",
borderRadius:8,
padding:"6px 12px",
cursor:"pointer"
}}
>
{x}
</button>

)}

</div>

<canvas
ref={canvas}
style={{
width:"100%",
height:"100%",
display:"block"
}}
/>

<div style={{
position:"absolute",
top:58,
right:16,
width:220,
padding:14,
background:"rgba(10,18,28,.82)",
backdropFilter:"blur(14px)",
borderRadius:12,
border:"1px solid rgba(255,255,255,.08)",
fontFamily:"monospace",
color:"#d7ecff"
}}>

<div>FPS : {fps}</div>
<div>Kernel : ONLINE</div>
<div>Agents : READY</div>
<div>Memory : ACTIVE</div>
<div>Zoom : {zoom}</div>

</div>

<div style={{
position:"absolute",
right:18,
bottom:56,
width:180,
height:110,
borderRadius:10,
background:"rgba(255,255,255,.04)",
border:"1px solid rgba(255,255,255,.08)"
}}/>

<div style={{
position:"absolute",
left:0,
right:0,
bottom:0,
height:34,
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"0 14px",
fontFamily:"monospace",
fontSize:12,
background:"rgba(7,10,15,.88)",
borderTop:"1px solid rgba(255,255,255,.06)",
color:"#a8cfff"
}}>

<span>GPU READY</span>
<span>Viewport</span>
<span>{time}</span>

</div>

</div>

)

}
