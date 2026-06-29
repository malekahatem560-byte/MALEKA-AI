import {DefaultWorkspace} from "./workspaceSchema"

const KEY="maleka.workspace"

export function loadWorkspace(){

const raw=localStorage.getItem(KEY)

return raw?JSON.parse(raw):DefaultWorkspace

}

export function saveWorkspace(layout:any){

localStorage.setItem(KEY,JSON.stringify(layout))

}
