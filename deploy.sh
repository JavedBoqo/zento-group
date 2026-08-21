#!/usr/bin/env bash
set -euo pipefail

# ==== CONFIGURATION ====
SERVER="zentogroup@92.205.19.35"
APP_DIR="/var/www/html/zento-group"
PM2_APP_NAME="zento-group"

echo "Building Next.js app locally..."
npm run build

echo "Syncing build artifacts to server..."
ssh "$SERVER" "mkdir -p '$APP_DIR'"

rsync -avz \
  --exclude node_modules \
  --exclude .git \
  --exclude ".env*" \
  .next \
  public \
  package.json \
  package-lock.json \
  next.config.ts \
  "$SERVER:$APP_DIR/"

echo "Ensuring runtime dependencies exist on server..."
ssh "$SERVER" "cd '$APP_DIR' && if [ ! -x node_modules/.bin/next ]; then npm install --omit=dev --no-audit --no-fund; fi"

echo "Restarting PM2 app..."
ssh "$SERVER" "cd '$APP_DIR' && pm2 restart '$PM2_APP_NAME' --update-env || pm2 start npm --name '$PM2_APP_NAME' -- start"

echo "Deployment complete."