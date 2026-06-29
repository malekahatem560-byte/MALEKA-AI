import * as fs from 'fs';
import * as path from 'path';
const STORE_DIR = './store';
// ضمان وجود المسار قبل بدء البحث
if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR);
    console.log("[SYSTEM] Directory './store' created.");
}
export class QueryAgent {
    static verifyIntegrity(data) {
        return data !== null && typeof data === 'object' && 'payload' in data;
    }
    static findScene(id) {
        const files = fs.readdirSync(STORE_DIR);
        const targetFile = files.find(file => file.startsWith(id));
        if (!targetFile) {
            console.log(`[QUERY] Scene '${id}' not found in store.`);
            return null;
        }
        const data = JSON.parse(fs.readFileSync(path.join(STORE_DIR, targetFile), 'utf-8'));
        if (!this.verifyIntegrity(data)) {
            console.error(`[INTEGRITY ERROR] Scene '${id}' found but corrupted.`);
            return null;
        }
        console.log(`[QUERY] Scene '${id}' retrieved. Integrity: PASSED ✅`);
        return data.payload;
    }
}
// أمر التحقق من الترابط التكاملي (Test)
const testQuery = QueryAgent.findScene("Khafre");
console.log(testQuery ? "[INTEGRITY CHECK] Connection: OK" : "[INTEGRITY CHECK] Connection: PENDING");
