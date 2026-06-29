export class RenderQueue {

private queue:any[]=[];

push(task:any){
this.queue.push(task);
}

size(){
return this.queue.length;
}

all(){
return this.queue;
}

}
