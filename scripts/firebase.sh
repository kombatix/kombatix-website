#!/usr/bin/env bash
#
# firebase.sh — thin wrapper for `firebase` that always injects
#   --project kombatix-website --account operations@kombatix.io
#
# Use this for ad-hoc firebase commands in this repo (not deploys — use
# scripts/deploy-safe.sh for deploys, which also runs verify-context first).
#
# Examples:
#   scripts/firebase.sh projects:list
#   scripts/firebase.sh functions:secrets:set HUBSPOT_PORTAL_ID
#   scripts/firebase.sh firestore:indexes
#   scripts/firebase.sh hosting:channel:list
#
# Why not just run `firebase` directly?
#   firebase CLI has its own auth store separate from gcloud — neither
#   .envrc nor CLOUDSDK_* env vars affect which firebase account is active.
#   `firebase login:use` is a global state change that flips across all
#   Claude / VS Code / terminal sessions on this machine. This wrapper
#   bypasses that by passing --account on every invocation.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ID="kombatix-website"
ACCOUNT="operations@kombatix.io"

cd "$REPO_ROOT"
exec firebase --project "$PROJECT_ID" --account "$ACCOUNT" "$@"
