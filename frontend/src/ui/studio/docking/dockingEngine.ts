export type DockArea="left"|"center"|"right"|"bottom"

export interface DockPanel{
  id:string
  title:string
  area:DockArea
  order:number
  visible:boolean
}

const KEY="maleka.docking"

const defaults:DockPanel[]=[
{id:"explorer",title:"Explorer",area:"left",order:0,visible:true},
{id:"viewport",title:"Viewport",area:"center",order:0,visible:true},
{id:"inspector",title:"Inspector",area:"right",order:0,visible:true},
{id:"memory",title:"Memory",area:"right",order:1,visible:true},
{id:"graph",title:"Node Graph",area:"bottom",order:0,visible:true},
{id:"timeline",title:"Timeline",area:"bottom",order:1,visible:true},
{id:"console",title:"Console",area:"bottom",order:2,visible:true}
]

class DockingEngine{

private panels=this.load()

private load():DockPanel[]{
try{
const raw=localStorage.getItem(KEY)
return raw?JSON.parse(raw):defaults
}catch{
return defaults
}
}

private save(){
localStorage.setItem(KEY,JSON.stringify(this.panels))
}

all(){
return [...this.panels].sort((a,b)=>a.order-b.order)
}

move(id:string,area:DockArea,order:number){
this.panels=this.panels.map(p=>
p.id===id
?{...p,area,order}
:p
)
this.save()
}

toggle(id:string){
this.panels=this.panels.map(p=>
p.id===id
?{...p,visible:!p.visible}
:p
)
this.save()
}

reset(){
this.panels=[...defaults]
this.save()
}

}

export const dockingEngine=new DockingEngine()
