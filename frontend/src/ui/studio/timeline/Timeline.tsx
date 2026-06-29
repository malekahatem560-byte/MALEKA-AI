export default function Timeline(){

return(

<div style={{
height:"100%",
padding:14,
background:"#0E141D",
borderRadius:16,
border:"1px solid rgba(255,255,255,.08)"
}}>

<div style={{
display:"flex",
justifyContent:"space-between",
marginBottom:10,
color:"#EEF4FF"
}}>

<span>TIMELINE</span>

<span>00:00:00:00</span>

</div>

<div style={{
height:120,
borderRadius:12,
background:
"repeating-linear-gradient(90deg,#1C2432 0,#1C2432 1px,transparent 1px,transparent 30px)"
}}/>

</div>

)

}
