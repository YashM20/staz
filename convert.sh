#!/usr/bin/env bash
# convert.sh
REPO_URL="https://github.com/YashM20/staz.git"
TARGET_DIR="public_viewer"

npx readarepo-zip \
  -u "$REPO_URL" \
  -t "$TARGET_DIR" \
  -d "!.git,!node_modules" \
  -l info
