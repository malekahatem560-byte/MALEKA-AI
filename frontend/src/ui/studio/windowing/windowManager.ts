export type WindowId =
  | "viewport"
  | "graph"
  | "timeline"
  | "console"
  | "memory"
  | "explorer"
  | "inspector"

export interface WindowState {
  id: WindowId
  visible: boolean
  floating: boolean
  pinned: boolean
  width?: number
  height?: number
}

const KEY="maleka.window.manager"

const defaults:WindowState[]=[
{id:"viewport",visible:true,floating:false,pinned:true},
{id:"graph",visible:true,floating:false,pinned:true},
{id:"timeline",visible:true,floating:false,pinned:true},
{id:"console",visible:true,floating:false,pinned:false},
{id:"memory",visible:true,floating:false,pinned:false},
{id:"explorer",visible:true,floating:false,pinned:true},
{id:"inspector",visible:true,floating:false,pinned:true}
]

class WindowManager{

private windows:WindowState[]=this.load()

private load(){

try{

const raw=localStorage.getItem(KEY)

return raw?JSON.parse(raw):defaults

}catch{

return defaults

}

}

private save(){

localStorage.setItem(KEY,JSON.stringify(this.windows))

}

all(){

return this.windows

}

toggle(id:WindowId){

this.windows=this.windows.map(w=>

w.id===id

?{...w,visible:!w.visible}

:w

)

this.save()

}

setFloating(id:WindowId,value:boolean){

this.windows=this.windows.map(w=>

w.id===id

?{...w,floating:value}

:w

)

this.save()

}

setPinned(id:WindowId,value:boolean){

this.windows=this.windows.map(w=>

w.id===id

?{...w,pinned:value}

:w

)

this.save()

}

}

export const windowManager=new WindowManager()
