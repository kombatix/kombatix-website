#!/usr/bin/env bash
#
# deploy-safe.sh — wraps `firebase deploy` with:
#   1. A fail-closed context verification (scripts/verify-context.sh --strict)
#   2. An explicit --project kombatix-website flag so the deploy cannot
#      redirect to whatever project is ambiently active.
#
# Usage:
#   scripts/deploy-safe.sh --only hosting
#   scripts/deploy-safe.sh --only functions
#   scripts/deploy-safe.sh --only hosting,functions
#   scripts/deploy-safe.sh hosting:channel:deploy preview --expires 7d
#
# Never `firebase deploy` this project without this wrapper. The whole
# point of the wrapper is that `firebase use` has been misleading in the
# past — it can report the right project while `gcloud`/auth is pointed
# elsewhere, and credentials from the wrong account slip in.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECT_ID="kombatix-website"

echo "▶ deploy-safe — verifying context before deploy"
"$SCRIPT_DIR/verify-context.sh" --strict

echo ""
echo "▶ deploy-safe — running: firebase --project $PROJECT_ID $*"
cd "$REPO_ROOT"

# First positional sometimes looks like a subcommand (hosting:channel:deploy)
# and sometimes looks like a flag (--only). Either way, prepend --project.
exec firebase --project "$PROJECT_ID" "$@"
