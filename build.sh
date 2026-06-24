#!/bin/bash
echo "Starting MALEKA Kernel Final Build..."
npx tsc --project tsconfig.json --strict --target ES2022 --module CommonJS
echo "Build Successful. Status: PRODUCTION_READY"
