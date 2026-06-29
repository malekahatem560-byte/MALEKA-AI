export type PanelId =
| "viewport"
| "graph"
| "timeline"
| "memory"
| "inspector"
| "explorer"
| "console"

export interface WorkspaceLayout{

left:PanelId[]

center:PanelId[]

right:PanelId[]

bottom:PanelId[]

}

export const DefaultWorkspace:WorkspaceLayout={

left:["explorer"],

center:["viewport"],

right:["inspector","memory"],

bottom:["graph","timeline","console"]

}
