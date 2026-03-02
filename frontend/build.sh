#!/usr/bin/env bash
# Build the OpsAgent frontend and copy dist to backend

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd /home/shayanna/opsagent/frontend

echo "Building Vite app..."
npx vite build

echo "Done! dist/ folder created."
ls -la dist/
