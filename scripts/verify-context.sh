#!/usr/bin/env bash
#
# verify-context.sh — fail-closed check that this shell/session is pointed
# at the correct Kombatix accounts before any write / push / deploy action.
#
# Usage:
#   scripts/verify-context.sh             # soft mode — prints warnings, exits 0
#   scripts/verify-context.sh --strict    # hard mode — exits 1 on any mismatch
#   scripts/verify-context.sh --quiet     # no banner on success (for hooks)
#
# Checks:
#   1. Git remote URL
#   2. Git local user.name / user.email
#   3. GitHub CLI active account + repo
#   4. gcloud active configuration
#   5. gcloud active account
#   6. gcloud active project
#   7. gcloud project number (confirms permission on the project)
#   8. Firebase default project
#   + FORBIDDEN-identity detection: any drifted identity (wrong account,
#     wrong project, wrong gh user, wrong git email) triggers a hard fail
#     independent of whether other checks pass.
#
# Escape hatch:
#   KOMBATIX_SKIP_CONTEXT_CHECK=1 scripts/verify-context.sh --strict
#     Skips all checks and exits 0. Use only when you deliberately need to
#     run this script in a drifted state. Never commit code with this set.
#
# This script is called by:
#   - .githooks/pre-push             (blocks push on failure)
#   - scripts/deploy-safe.sh         (blocks deploy on failure)
#   - manually at session start      (sanity check after `source .envrc`)
#
# Keep EXPECTED_* and FORBIDDEN_* in sync with CLAUDE.md §1, PROJECT_SAFETY.md,
# .envrc, .githooks/pre-push, and scripts/deploy-safe.sh.

set -u

# ──────────────────────────────────────────────────────────────────────────
# Expected values (LOCKED — see CLAUDE.md §1)
# ──────────────────────────────────────────────────────────────────────────
EXPECTED_GH_REPO="kombatix/kombatix-website"
EXPECTED_GIT_REMOTE_HTTPS="https://github.com/kombatix/kombatix-website.git"
EXPECTED_GIT_REMOTE_SSH="git@github.com:kombatix/kombatix-website.git"
EXPECTED_GIT_USER_NAME="kombatix"
EXPECTED_GIT_USER_EMAIL="operations@kombatix.io"
EXPECTED_GCLOUD_ACCOUNT="operations@kombatix.io"
EXPECTED_GCLOUD_PROJECT="kombatix-website"
EXPECTED_GCLOUD_PROJECT_NUMBER="614939493231"
EXPECTED_GCLOUD_CONFIG="kombatix"
EXPECTED_FIREBASE_PROJECT="kombatix-website"
EXPECTED_GH_USER="kombatix"

# ──────────────────────────────────────────────────────────────────────────
# Forbidden identities — hard-fail if these appear, even if the rest passes.
# These are known identities from other tenants on this machine that MUST
# NOT be present in this repo's git / gh / gcloud / Firebase state.
#
# If you see this list growing, the cross-project bleed problem is getting
# worse and you should be running direnv across every hardened repo.
# ──────────────────────────────────────────────────────────────────────────

# Big Fat Dad GCP projects — wrong tenant, hard-fail on sight
FORBIDDEN_GCP_PROJECTS=(
    "chargeback-defense-prod"
    "lumisai-app"
    "payments-ai-dashboard"
    "personiq-app"
    "pillow-talk-daily"
    "real-estate-marketing-engine"
    "ringserve-c58cd"
    "setadrift"
    "tradebot-prime"
    "trustmatch-api"
    "veoflow-engine"
    "veoflow-generator"
    "vibelab-saas-prod-0224"
    "wanderlings-app"
)

# Other tenant GitHub users — operations@kombatix.io commits from this repo
# should never come from these gh-CLI active users
FORBIDDEN_GH_USERS=(
    "thebigfatdad"
    "darrel-peoplefinders"
)

# Other tenant git commit emails — never commit from this repo as these
FORBIDDEN_GIT_EMAILS=(
    "admin@thebigfatdad.com"
    "darrel@peoplefinders.com"
    "darrel@propertyreach.com"
)

# Other tenant gcloud accounts — same reason
FORBIDDEN_GCLOUD_ACCOUNTS=(
    "admin@thebigfatdad.com"
    "darrel@peoplefinders.com"
    "darrel@propertyreach.com"
)

# ──────────────────────────────────────────────────────────────────────────
# Mode parsing
# ──────────────────────────────────────────────────────────────────────────
STRICT=0
QUIET=0
for arg in "$@"; do
    case "$arg" in
        --strict) STRICT=1 ;;
        --quiet)  QUIET=1  ;;
        *) ;;
    esac
done

# ──────────────────────────────────────────────────────────────────────────
# Escape hatch
# ──────────────────────────────────────────────────────────────────────────
if [ "${KOMBATIX_SKIP_CONTEXT_CHECK:-0}" = "1" ]; then
    echo "⚠️  verify-context: KOMBATIX_SKIP_CONTEXT_CHECK=1 — all checks skipped"
    exit 0
fi

# ──────────────────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────────────────
FAILURES=0
CHECKS=0

pass() {
    CHECKS=$((CHECKS + 1))
    [ "$QUIET" = "1" ] || printf "  ✓ %-28s %s\n" "$1" "$2"
}

fail() {
    CHECKS=$((CHECKS + 1))
    FAILURES=$((FAILURES + 1))
    printf "  ✗ %-28s %s\n" "$1" "$2" >&2
    printf "     expected: %s\n" "$3" >&2
    printf "     actual:   %s\n" "$4" >&2
}

forbidden() {
    # one-arg form: just a check-name; two-arg form: name + reason line
    CHECKS=$((CHECKS + 1))
    FAILURES=$((FAILURES + 1))
    printf "  ⛔ %-28s FORBIDDEN identity detected: %s\n" "$1" "$2" >&2
}

warn() {
    CHECKS=$((CHECKS + 1))
    FAILURES=$((FAILURES + 1))
    printf "  ! %-28s %s\n" "$1" "$2" >&2
}

contains() {
    # usage: contains <needle> <haystack_array_name>
    local needle="$1"
    shift
    local item
    for item in "$@"; do
        [ "$item" = "$needle" ] && return 0
    done
    return 1
}

[ "$QUIET" = "1" ] || {
    echo "Kombatix context verification"
    echo "─────────────────────────────"
}

# ──────────────────────────────────────────────────────────────────────────
# 1. Git remote
# ──────────────────────────────────────────────────────────────────────────
if ! command -v git >/dev/null 2>&1; then
    warn "git" "git CLI not found on PATH"
else
    ACTUAL_REMOTE=$(git remote get-url origin 2>/dev/null || echo "<no remote>")
    if [ "$ACTUAL_REMOTE" = "$EXPECTED_GIT_REMOTE_HTTPS" ] || \
       [ "$ACTUAL_REMOTE" = "$EXPECTED_GIT_REMOTE_SSH" ]; then
        pass "git remote origin" "$ACTUAL_REMOTE"
    else
        fail "git remote origin" "origin points elsewhere" \
             "$EXPECTED_GIT_REMOTE_HTTPS (or SSH equivalent)" "$ACTUAL_REMOTE"
    fi

    # git user.name / user.email (local scope only — global is user's choice)
    ACTUAL_GIT_NAME=$(git config --local user.name 2>/dev/null || echo "<unset>")
    if [ "$ACTUAL_GIT_NAME" = "$EXPECTED_GIT_USER_NAME" ]; then
        pass "git user.name (local)" "$ACTUAL_GIT_NAME"
    else
        fail "git user.name (local)" "wrong git user.name" \
             "$EXPECTED_GIT_USER_NAME" "$ACTUAL_GIT_NAME"
    fi

    ACTUAL_GIT_EMAIL=$(git config --local user.email 2>/dev/null || echo "<unset>")
    if contains "$ACTUAL_GIT_EMAIL" "${FORBIDDEN_GIT_EMAILS[@]}"; then
        forbidden "git user.email (local)" "$ACTUAL_GIT_EMAIL → FORBIDDEN tenant"
    elif [ "$ACTUAL_GIT_EMAIL" = "$EXPECTED_GIT_USER_EMAIL" ]; then
        pass "git user.email (local)" "$ACTUAL_GIT_EMAIL"
    else
        fail "git user.email (local)" "wrong git user.email" \
             "$EXPECTED_GIT_USER_EMAIL" "$ACTUAL_GIT_EMAIL"
    fi
fi

# ──────────────────────────────────────────────────────────────────────────
# 2. gh active user + repo
# ──────────────────────────────────────────────────────────────────────────
if ! command -v gh >/dev/null 2>&1; then
    warn "gh" "gh CLI not found on PATH"
else
    ACTUAL_GH_USER=$(gh api user --jq .login 2>/dev/null || echo "<gh api failed>")
    if contains "$ACTUAL_GH_USER" "${FORBIDDEN_GH_USERS[@]}"; then
        forbidden "gh active user" "$ACTUAL_GH_USER → FORBIDDEN tenant"
    elif [ "$ACTUAL_GH_USER" = "$EXPECTED_GH_USER" ]; then
        pass "gh active user" "$ACTUAL_GH_USER"
    else
        fail "gh active user" "wrong GitHub user active" \
             "$EXPECTED_GH_USER" "$ACTUAL_GH_USER"
    fi

    ACTUAL_GH_REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null || echo "<no repo>")
    if [ "$ACTUAL_GH_REPO" = "$EXPECTED_GH_REPO" ]; then
        pass "gh repo view" "$ACTUAL_GH_REPO"
    else
        fail "gh repo view" "repo mismatch" \
             "$EXPECTED_GH_REPO" "$ACTUAL_GH_REPO"
    fi
fi

# ──────────────────────────────────────────────────────────────────────────
# 3. gcloud config / account / project
# ──────────────────────────────────────────────────────────────────────────
if ! command -v gcloud >/dev/null 2>&1; then
    warn "gcloud" "gcloud CLI not found on PATH"
else
    # Active config — honors CLOUDSDK_ACTIVE_CONFIG_NAME env var override
    ACTUAL_GCLOUD_CONFIG=$(gcloud config configurations list \
        --filter='is_active:true' --format='value(name)' 2>/dev/null || echo "<error>")
    if [ "$ACTUAL_GCLOUD_CONFIG" = "$EXPECTED_GCLOUD_CONFIG" ]; then
        pass "gcloud active config" "$ACTUAL_GCLOUD_CONFIG"
    else
        fail "gcloud active config" "wrong gcloud configuration" \
             "$EXPECTED_GCLOUD_CONFIG (via CLOUDSDK_ACTIVE_CONFIG_NAME)" "$ACTUAL_GCLOUD_CONFIG"
    fi

    ACTUAL_GCLOUD_ACCOUNT=$(gcloud config get-value account 2>/dev/null || echo "<error>")
    if contains "$ACTUAL_GCLOUD_ACCOUNT" "${FORBIDDEN_GCLOUD_ACCOUNTS[@]}"; then
        forbidden "gcloud active account" "$ACTUAL_GCLOUD_ACCOUNT → FORBIDDEN tenant"
    elif [ "$ACTUAL_GCLOUD_ACCOUNT" = "$EXPECTED_GCLOUD_ACCOUNT" ]; then
        pass "gcloud active account" "$ACTUAL_GCLOUD_ACCOUNT"
    else
        fail "gcloud active account" "wrong Google account" \
             "$EXPECTED_GCLOUD_ACCOUNT" "$ACTUAL_GCLOUD_ACCOUNT"
    fi

    ACTUAL_GCLOUD_PROJECT=$(gcloud config get-value project 2>/dev/null || echo "<error>")
    if contains "$ACTUAL_GCLOUD_PROJECT" "${FORBIDDEN_GCP_PROJECTS[@]}"; then
        forbidden "gcloud active project" "$ACTUAL_GCLOUD_PROJECT → FORBIDDEN tenant"
    elif [ "$ACTUAL_GCLOUD_PROJECT" = "$EXPECTED_GCLOUD_PROJECT" ]; then
        pass "gcloud active project" "$ACTUAL_GCLOUD_PROJECT"
    else
        fail "gcloud active project" "wrong GCP project" \
             "$EXPECTED_GCLOUD_PROJECT" "$ACTUAL_GCLOUD_PROJECT"
    fi

    # Project number — confirms we have permission on the project AND that
    # the project ID resolves to the expected number (guards against a renamed
    # project with the same ID in a different org).
    ACTUAL_GCLOUD_PROJECT_NUMBER=$(gcloud projects describe "$EXPECTED_GCLOUD_PROJECT" \
        --format='value(projectNumber)' 2>/dev/null || echo "<error or no permission>")
    if [ "$ACTUAL_GCLOUD_PROJECT_NUMBER" = "$EXPECTED_GCLOUD_PROJECT_NUMBER" ]; then
        pass "gcloud project number" "$ACTUAL_GCLOUD_PROJECT_NUMBER"
    else
        fail "gcloud project number" "project number mismatch or no access" \
             "$EXPECTED_GCLOUD_PROJECT_NUMBER" "$ACTUAL_GCLOUD_PROJECT_NUMBER"
    fi
fi

# ──────────────────────────────────────────────────────────────────────────
# 4. Firebase project + account
# ──────────────────────────────────────────────────────────────────────────
if ! command -v firebase >/dev/null 2>&1; then
    warn "firebase" "firebase CLI not found on PATH"
else
    FIREBASE_USE_OUTPUT=$(firebase use 2>/dev/null | head -1 || echo "<error>")
    ACTUAL_FIREBASE_PROJECT=$(echo "$FIREBASE_USE_OUTPUT" | awk '{print $1}')
    if contains "$ACTUAL_FIREBASE_PROJECT" "${FORBIDDEN_GCP_PROJECTS[@]}"; then
        forbidden "firebase project" "$ACTUAL_FIREBASE_PROJECT → FORBIDDEN tenant"
    elif [ "$ACTUAL_FIREBASE_PROJECT" = "$EXPECTED_FIREBASE_PROJECT" ]; then
        pass "firebase project" "$ACTUAL_FIREBASE_PROJECT"
    else
        fail "firebase project" "wrong Firebase project" \
             "$EXPECTED_FIREBASE_PROJECT" "$ACTUAL_FIREBASE_PROJECT"
    fi

    # firebase CLI has its own auth layer — separate from gcloud. The active
    # firebase account is set by `firebase login:use` (global state) and is
    # NOT controlled by any env var. Check it separately.
    #
    # `firebase login:list` outputs:
    #   Logged in as <active-account>
    #   Other available accounts ...
    ACTUAL_FIREBASE_ACCOUNT=$(firebase login:list 2>/dev/null \
        | grep -E "^Logged in as" | sed -E 's/^Logged in as[[:space:]]+//' \
        || echo "<error>")
    if contains "$ACTUAL_FIREBASE_ACCOUNT" "${FORBIDDEN_GCLOUD_ACCOUNTS[@]}"; then
        forbidden "firebase active account" "$ACTUAL_FIREBASE_ACCOUNT → FORBIDDEN tenant"
    elif [ "$ACTUAL_FIREBASE_ACCOUNT" = "$EXPECTED_GCLOUD_ACCOUNT" ]; then
        pass "firebase active account" "$ACTUAL_FIREBASE_ACCOUNT"
    else
        fail "firebase active account" "wrong firebase-CLI account" \
             "$EXPECTED_GCLOUD_ACCOUNT" "$ACTUAL_FIREBASE_ACCOUNT"
    fi
fi

# ──────────────────────────────────────────────────────────────────────────
# Report
# ──────────────────────────────────────────────────────────────────────────
[ "$QUIET" = "1" ] || echo "─────────────────────────────"
if [ "$FAILURES" -eq 0 ]; then
    [ "$QUIET" = "1" ] || echo "✅ All $CHECKS checks passed."
    exit 0
fi

echo "❌ $FAILURES of $CHECKS checks FAILED." >&2
echo "" >&2
echo "Remediation — see PROJECT_SAFETY.md for full details. Common fixes:" >&2
echo "  • gcloud config drifted: source .envrc  (or run 'direnv allow .' once)" >&2
echo "  • gh wrong user:         gh auth switch -u kombatix" >&2
echo "  • gcloud not authed:     gcloud auth login operations@kombatix.io" >&2
echo "  • git email wrong:       git config --local user.email operations@kombatix.io" >&2
echo "  • config missing:        see .envrc for creation snippet" >&2
echo "" >&2

if [ "$STRICT" = "1" ]; then
    echo "--strict mode: exiting 1" >&2
    exit 1
fi

echo "(soft mode — exit 0; re-run with --strict to fail the build)" >&2
exit 0
