#!/bin/bash
echo "--- MALEKA OS: INITIALIZING ISOLATED ENVIRONMENT ---"

# التنظيف الجذري
rm -rf dist/ tsconfig.tsbuildinfo

# التحقق من الاعتماديات
if [ ! -d "node_modules" ]; then
    echo "Installing missing dependencies..."
    npm install
fi

# البناء الصارم
npx tsc --build tsconfig.json
if [ $? -ne 0 ]; then
    echo "MALEKA BUILD FAILED. ABORTING."
    exit 1
fi

# التشغيل الاحتوائي
echo "--- MALEKA OS: STARTING CORE ENGINE ---"
node dist/index.js
