#!/usr/bin/env bash
set -euo pipefail

SERVER="zentogroup@92.205.19.35"
APP_DIR="/var/www/html/zento-group"
PM2_APP_NAME="zento-group"
ENV_FILE=".env"   # local env file to push to the server as .env

# One SSH connection for everything (password asked once)
CTRL="/tmp/ssh-deploy-zento-$$"
SSH_OPTS=(-o ControlMaster=auto -o ControlPath="$CTRL" -o ControlPersist=120)
ssh_run() { ssh "${SSH_OPTS[@]}" "$SERVER" "$@"; }
trap 'ssh -O exit -o ControlPath="$CTRL" "$SERVER" 2>/dev/null || true' EXIT

echo "==> Building locally..."
#rm -rf .next
#npm run build
test -f .next/BUILD_ID || { echo "Build failed: no BUILD_ID"; exit 1; }
test -f "$ENV_FILE" || { echo "Missing local $ENV_FILE"; exit 1; }

echo "==> Uploading..."
ssh_run "mkdir -p '$APP_DIR'"
rsync -az --info=progress2 --delete \
  -e "ssh ${SSH_OPTS[*]}" \
  --exclude ".next/cache" \
  --exclude ".next/dev" \
  .next public package.json package-lock.json next.config.* \
  "$SERVER:$APP_DIR/"

echo "==> Syncing env file..."
rsync -az --chmod=F600 \
  -e "ssh ${SSH_OPTS[*]}" \
  "$ENV_FILE" "$SERVER:$APP_DIR/.env"
echo "Server SMTP settings (password hidden):"
ssh_run "grep -E '^(SMTP_HOST|SMTP_PORT|SMTP_SECURE|SMTP_USER|MAIL_TO)=' '$APP_DIR/.env'; grep -q '^SMTP_PASS=.' '$APP_DIR/.env' && echo 'SMTP_PASS=<set>' || echo 'SMTP_PASS=<MISSING>'"

echo "==> Installing production dependencies on server..."
ssh_run "cd '$APP_DIR' && npm install --omit=dev --no-audit --no-fund"

echo "==> Restarting app..."
ssh_run "cd '$APP_DIR' && (pm2 restart '$PM2_APP_NAME' --update-env || pm2 start npm --name '$PM2_APP_NAME' -- start) && pm2 save >/dev/null"

echo "==> Last logs:"
sleep 4
ssh_run "pm2 logs '$PM2_APP_NAME' --lines 15 --nostream"
echo "Deployment complete."