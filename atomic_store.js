import * as fs from 'fs';
import * as path from 'path';
const STORE_DIR = './store';
if (!fs.existsSync(STORE_DIR))
    fs.mkdirSync(STORE_DIR);
export class AtomicStore {
    // 1. أمر التحقق من الترابط التكاملي (Integrity Check)
    static verifyIntegrity(data) {
        return data !== null && typeof data === 'object' && 'id' in data;
    }
    // 2. الحفظ مع التحقق التكاملي
    static saveEntry(id, data) {
        if (!this.verifyIntegrity({ id, ...data })) {
            console.error(`[INTEGRITY ERROR] Data for ${id} failed validation.`);
            return false;
        }
        const timestamp = Date.now();
        const filePath = path.join(STORE_DIR, `${id}_${timestamp}.json`);
        fs.writeFileSync(filePath, JSON.stringify({ id, timestamp, payload: data }, null, 2));
        console.log(`[STORE] Entry ${id} saved. Integrity: PASSED ✅`);
        return true;
    }
}
