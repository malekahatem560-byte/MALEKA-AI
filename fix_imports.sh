#!/usr/bin/env bash
set -e

echo "[1/3] Fixing Node built-in imports..."

find src -type f -name "*.ts" -print0 | while IFS= read -r -d '' file
do
sed -i 
-e "s|'fs.ts'|'fs'|g" 
-e "s|"fs.ts"|"fs"|g" 
-e "s|'path.ts'|'path'|g" 
-e "s|"path.ts"|"path"|g" 
-e "s|'crypto.ts'|'crypto'|g" 
-e "s|"crypto.ts"|"crypto"|g" 
-e "s|'zlib.ts'|'zlib'|g" 
-e "s|"zlib.ts"|"zlib"|g" 
-e "s|'stream.ts'|'stream'|g" 
-e "s|"stream.ts"|"stream"|g" 
-e "s|'util.ts'|'util'|g" 
-e "s|"util.ts"|"util"|g" 
-e "s|'fs/promises.ts'|'fs/promises'|g" 
-e "s|"fs/promises.ts"|"fs/promises"|g" 
-e "s|'node:fs.ts'|'node:fs'|g" 
-e "s|"node:fs.ts"|"node:fs"|g" 
"$file"
done

echo "[2/3] Fixing local imports..."

python3 << 'PY'
from pathlib import Path
import re

for f in Path("src").rglob("*.ts"):
text = f.read_text(encoding="utf-8")

text = re.sub(
    r"(from\s+['\"])(\./[^'\"]+)\.ts(['\"])",
    r"\1\2.js\3",
    text
)

text = re.sub(
    r"(from\s+['\"])(\.\./[^'\"]+)\.ts(['\"])",
    r"\1\2.js\3",
    text
)

f.write_text(text, encoding="utf-8")

PY

echo "[3/3] Verification..."

echo
echo "Remaining .ts imports:"
grep -R -nE "from ['"].*.ts['"]" src || true

echo
echo "Compiling..."
npx tsc --noEmit
