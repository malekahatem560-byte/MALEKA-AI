import * as fs from 'fs';

// 1. تعريف النواة الذاتية
class LivingKernel {
    constructor() {
        if (!fs.existsSync('./input')) fs.mkdirSync('./input');
        if (!fs.existsSync('./output')) fs.mkdirSync('./output');
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

// 2. تعريف المحسن الذاتي
class AutoOptimizer {
    public static optimize() {
        const logFile = './kernel_log.txt';
        if (fs.existsSync(logFile) && fs.statSync(logFile).size > 1000) {
            fs.writeFileSync(logFile, '');
        }
    }
}

// 3. المنسق الرئيسي (Main Core)
class BF_OS_Core {
    private kernel = new LivingKernel();

    public boot() {
        console.log("[BF-OS] Booting...");
        AutoOptimizer.optimize();
        this.kernel.executeAutonomousLogic();
        console.log("[BF-OS] System Status: OPERATIONAL ✅");
    }
}

// الإقلاع
new BF_OS_Core().boot();
