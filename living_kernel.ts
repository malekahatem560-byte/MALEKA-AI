import * as fs from 'fs';

// تصدير الكلاس ليصبح مرئياً لبقية النظام
export class LivingKernel {
    private readonly LOG_FILE = './kernel_log.txt';

    constructor() {
        if (!fs.existsSync('./input')) fs.mkdirSync('./input');
        if (!fs.existsSync('./output')) fs.mkdirSync('./output');
        this.selfCheck();
    }

    private selfCheck() {
        console.log("[KERNEL] Integrity Check: ACTIVE.");
        const status = fs.existsSync('./output') ? 'STABLE' : 'CRITICAL';
        fs.appendFileSync(this.LOG_FILE, `[${new Date().toISOString()}] State: ${status}\n`);
    }

    public async executeAutonomousLogic() {
        console.log("[KERNEL] Autonomous Loop: STARTED.");
        setInterval(() => {
            const files = fs.readdirSync('./input');
            if (files.length > 0) {
                const task = files[0];
                console.log(`[KERNEL] Processing: ${task}`);
                fs.renameSync(`./input/${task}`, `./output/${task}.processed`);
            }
        }, 5000);
    }
}
