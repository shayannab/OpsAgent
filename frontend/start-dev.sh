#!/usr/bin/env bash
# Start the OpsAgent frontend dev server
# Sources WSL environment properly first

# Source common profile paths to pick up nvm/node
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "/usr/share/nvm/init-nvm.sh" ] && \. "/usr/share/nvm/init-nvm.sh"

# Also try snap node
[ -x "/snap/bin/node" ] && export PATH="/snap/bin:$PATH"

# Try nodejs from apt
[ -x "/usr/bin/nodejs" ] && alias node=/usr/bin/nodejs

echo "Node: $(node --version 2>/dev/null || echo 'not found')"
echo "npm: $(npm --version 2>/dev/null || echo 'not found')"

cd /home/shayanna/opsagent/frontend

# Run vite directly
exec npx vite --host 0.0.0.0 --port 3000
