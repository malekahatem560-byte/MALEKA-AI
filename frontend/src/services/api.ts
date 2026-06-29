const API = "http://127.0.0.1:8080";

export async function getStatus() {
  const r = await fetch(`${API}/api/status`);
  return r.json();
}

export async function getStudioStatus() {
  const r = await fetch(`${API}/studio/status`);
  return r.json();
}

export function connectGateway(onMessage: (data:any)=>void) {
  const ws = new WebSocket("ws://127.0.0.1:8080");

  ws.onmessage = (e)=>{
    try{
      onMessage(JSON.parse(e.data));
    }catch{}
  };

  ws.onopen = ()=>{
    ws.send(JSON.stringify({action:"status"}));
  };

  return ws;
}
