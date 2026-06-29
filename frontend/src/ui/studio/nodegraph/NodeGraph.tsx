const nodes=[
{id:1,x:80,y:70,title:"INPUT",color:"#4F8DFF"},
{id:2,x:360,y:160,title:"ANALYZER",color:"#5AE3FF"},
{id:3,x:670,y:110,title:"PLANNER",color:"#9D7CFF"},
{id:4,x:960,y:220,title:"EXECUTOR",color:"#3DDC84"},
{id:5,x:1260,y:140,title:"OUTPUT",color:"#FFB347"}
]

export default function NodeGraph(){

return(

<div
style={{
position:"relative",
width:"100%",
height:"100%",
overflow:"auto",
background:"#090d13"
}}
>

<svg
width="1800"
height="1000"
style={{
position:"absolute",
inset:0
}}
>

{nodes.slice(0,-1).map((n,i)=>{

const b=nodes[i+1]

return(

<line

key={i}

x1={n.x+180}

y1={n.y+42}

x2={b.x}

y2={b.y+42}

stroke="#55CFFF"

strokeWidth="3"

opacity=".45"

/>

)

})}

</svg>

{nodes.map(node=>(

<div

key={node.id}

style={{

position:"absolute",

left:node.x,

top:node.y,

width:180,

height:84,

borderRadius:16,

background:"#131B27",

border:`2px solid ${node.color}`,

display:"flex",

alignItems:"center",

justifyContent:"center",

fontWeight:700,

color:"#EDF4FF",

boxShadow:"0 18px 45px rgba(0,0,0,.35)"

}}

>

{node.title}

</div>

))}

</div>

)

}
