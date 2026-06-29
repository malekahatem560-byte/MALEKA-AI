

import fs from "fs";

const f="src/infrastructure/api/server.ts";
let s=fs.readFileSync(f,"utf8");

if(!s.includes("/kernel")){

s=s.replace(
"const httpServer = createHttpServer(app);",
`
app.get("/kernel", (_, res) => {
res.json({
status:"ONLINE",
uptime:process.uptime(),
memory:process.memoryUsage(),
cpu:process.cpuUsage(),
pid:process.pid,
platform:process.platform,
node:process.version
});
});

app.get("/runtime", (_, res) => {
res.json({
status:"RUNNING",
timestamp:Date.now(),
uptime:process.uptime()
});
});

const httpServer = createHttpServer(app);
`
);

fs.writeFileSync(f,s);
console.log("PATCH_APPLIED");

}else{
console.log("ALREADY_PATCHED");
}

