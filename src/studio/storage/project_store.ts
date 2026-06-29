import * as fs from 'node:fs';

export class ProjectStore {

save(id:string,data:any){

if(!fs.existsSync('./studio_data')){
fs.mkdirSync('./studio_data');
}

fs.writeFileSync(
`./studio_data/${id}.json`,
JSON.stringify(data,null,2)
);

}

}
