#!/usr/bin/env bash
# convert.sh

# Get the current repository URL dynamically from GitHub Actions context
REPO_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}.git"
TARGET_DIR="public_viewer"

echo "Converting repository: $REPO_URL"

readarepo-zip \
  -u "$REPO_URL" \
  -t "$TARGET_DIR" \
  -d "!.git,!node_modules,!.github" \
  -h pygments \
  -l info
