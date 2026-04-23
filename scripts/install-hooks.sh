#!/usr/bin/env bash
#
# install-hooks.sh — point this repo's git hooksPath at .githooks/ so
# versioned hooks run on every clone.
#
# Why versioned hooks: the default .git/hooks/ is NOT checked into git.
# That means hook drift across machines, and new contributors never get
# the protections. `core.hooksPath=.githooks` fixes that.
#
# Run once per clone:
#   scripts/install-hooks.sh
#
# Idempotent — safe to re-run.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$REPO_ROOT"

if [ ! -d .git ]; then
    echo "✗ not a git repository: $REPO_ROOT" >&2
    exit 1
fi

if [ ! -d .githooks ]; then
    echo "✗ .githooks/ directory not found" >&2
    exit 1
fi

git config --local core.hooksPath .githooks
echo "✓ git core.hooksPath set to .githooks"

# Ensure hook files are executable — on Windows this matters less but git
# preserves the bit, so set it explicitly.
for hook in .githooks/*; do
    if [ -f "$hook" ]; then
        chmod +x "$hook" 2>/dev/null || true
        echo "✓ made executable: $hook"
    fi
done

# Also ensure the scripts are executable
for script in scripts/*.sh; do
    if [ -f "$script" ]; then
        chmod +x "$script" 2>/dev/null || true
    fi
done

echo ""
echo "Hooks installed. Test with:"
echo "  scripts/verify-context.sh --strict"
