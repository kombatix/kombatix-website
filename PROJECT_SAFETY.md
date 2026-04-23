# PROJECT_SAFETY.md — Kombatix Website

This document explains the cross-project safety hardening in this repo. It describes what's installed, why, how to remediate drift, and how to bypass the checks when you genuinely need to.

If you're a new contributor on this repo, read this file once, run `scripts/install-hooks.sh`, and you're done.

---

## Why this exists

The primary developer (Darrel) works across multiple Google / GitHub / Firebase / GCP accounts simultaneously:

- **PeopleFinders** — SVP of Operations
- **Big Fat Dad** — admin@thebigfatdad.com, 14+ gcloud configurations
- **Kombatix** — operations@kombatix.io, this project
- **PropertyReach**, **PeopleFinders** family, and others

Parallel Claude Code / VS Code / terminal sessions silently flip the active `gh` user, the active `gcloud` configuration, and the active GCP project on each other. A command that looks right one minute can target a different project the next.

**The single most common way code ships to the wrong account is drifted CLI state.** This hardening makes that failure mode loud instead of silent.

---

## What's installed

| File | Purpose |
|---|---|
| `.envrc` | Pins `GOOGLE_CLOUD_PROJECT`, `CLOUDSDK_ACTIVE_CONFIG_NAME`, `FIREBASE_PROJECT`, etc. via env vars scoped to this directory. Auto-loaded by `direnv`. |
| `scripts/verify-context.sh` | Fail-closed checker. Reads git remote, active `gh` user, `gcloud` config/account/project/project-number, and `firebase use`, and compares against hard-coded expected values. |
| `scripts/deploy-safe.sh` | Wraps `firebase deploy` with `--strict` context verification + an explicit `--project kombatix-website` flag. Never `firebase deploy` without this wrapper. |
| `scripts/install-hooks.sh` | Sets `git core.hooksPath=.githooks` so versioned hooks run on every clone. |
| `.githooks/pre-push` | Blocks `git push` unless (a) the remote matches `kombatix/kombatix-website` and (b) `verify-context.sh --strict` passes. |

Repo-local git config (set during initial setup, do not edit without reason):

```
user.name=kombatix
user.email=192059152+kombatix@users.noreply.github.com
credential.https://github.com.username=kombatix
core.hooksPath=.githooks   # after running install-hooks.sh
```

The `credential.https://github.com.username=kombatix` pin is important — it forces git to use the kombatix credential from the gh keyring regardless of which `gh` user is ambiently active. So even if another Claude session flips `gh auth switch -u thebigfatdad`, pushes from this repo still authenticate as kombatix.

---

## Expected values (LOCKED — see CLAUDE.md §1)

| Key | Value |
|---|---|
| GitHub org / repo | `kombatix/kombatix-website` |
| git remote origin (HTTPS) | `https://github.com/kombatix/kombatix-website.git` |
| git remote origin (SSH) | `git@github.com:kombatix/kombatix-website.git` |
| gh active user | `kombatix` |
| gcloud active configuration | `kombatix` |
| gcloud active account | `operations@kombatix.io` |
| gcloud active project | `kombatix-website` |
| GCP project number | `614939493231` |
| Firebase project | `kombatix-website` |

To change any of these you must update: `CLAUDE.md` §1, `scripts/verify-context.sh` (EXPECTED_* constants), `scripts/deploy-safe.sh` (PROJECT_ID), `.githooks/pre-push` (EXPECTED_HTTPS / EXPECTED_SSH), and `.envrc`. Don't leave them out of sync.

---

## First-time setup (per clone)

```bash
# 1. Install direnv (recommended — auto-loads .envrc per directory)
winget install direnv.direnv                  # Windows
# brew install direnv                          # macOS
# sudo apt install direnv                      # Linux
# Then add `eval "$(direnv hook bash)"` to ~/.bashrc (or ~/.zshrc).
# Restart your shell.

# 2. Allow this repo's .envrc
cd c:/Projects/kombatix-website
direnv allow .

# 3. Install the versioned git hooks
scripts/install-hooks.sh

# 4. Create the kombatix gcloud configuration (one-time per machine)
gcloud config configurations create kombatix --no-activate
gcloud config configurations activate kombatix
gcloud config set account operations@kombatix.io
gcloud config set project kombatix-website
# Reactivate your previous config so you don't affect other projects:
gcloud config configurations activate <your-previous-config>

# 5. Make sure operations@kombatix.io is authenticated
gcloud auth list | grep operations@kombatix.io || \
    gcloud auth login operations@kombatix.io

# 6. Verify everything is green
scripts/verify-context.sh --strict
```

If step 6 passes, you're good. Subsequent sessions in this repo will auto-load `.envrc` (thanks to direnv), which pins `CLOUDSDK_ACTIVE_CONFIG_NAME=kombatix`, which overrides whatever config is ambiently active.

---

## Remediation — common failures

### `gcloud active config` = something other than `kombatix`

You forgot to `direnv allow .`, or you're in a shell that didn't inherit the env. Fix:

```bash
source .envrc      # manual load
# or:
direnv allow .     # permanent, auto-load on cd
```

### `gcloud active account` = `admin@thebigfatdad.com` (or any other account)

`CLOUDSDK_CORE_ACCOUNT` env var is set but the `kombatix` config has a different account configured. Fix:

```bash
gcloud config configurations activate kombatix
gcloud config set account operations@kombatix.io
gcloud config configurations activate <your-previous-config>   # restore state
```

### `gh active user` = `thebigfatdad` or `darrel-peoplefinders`

`gh` flipped to another user at the global level. For in-session fix:

```bash
gh auth switch -u kombatix
```

Git pushes from this repo are already credentialed via the repo-local `credential.https://github.com.username=kombatix` config, so this matters less for pushes than for `gh api`, `gh pr`, `gh issue`, etc.

### `gcloud project number` = `<error or no permission>`

Either (a) `gcloud` is authenticated as an account that doesn't have access to `kombatix-website`, or (b) the project has been renamed/moved. Most common cause: wrong active account. See above.

### `firebase project` = wrong value

`.firebaserc` has `"default": "kombatix-website"`, so `firebase use` should report `kombatix-website` from anywhere in the repo. If it doesn't, either `.firebaserc` has been edited (don't), or there's an alias override. Reset:

```bash
firebase use --clear
firebase use kombatix-website
```

### "git fetch / push fails with 403"

The `credential.https://github.com.username=kombatix` is set, but the kombatix gh token has expired or the user was logged out. Fix:

```bash
gh auth status                    # inspect
gh auth login --git-protocol https --hostname github.com
# ... log in as kombatix user
```

---

## Bypass mechanics

There are times you genuinely need to run a command from this repo without context verification — inspecting another project's Firestore from the same shell, comparing two projects side-by-side, etc.

### Skip verify-context.sh entirely

```bash
KOMBATIX_SKIP_CONTEXT_CHECK=1 scripts/verify-context.sh --strict    # passes without checking
KOMBATIX_SKIP_CONTEXT_CHECK=1 scripts/deploy-safe.sh --only hosting # BAD — never bypass for deploys
```

Use this for read-only exploration. Never use it to deploy.

### Skip the pre-push hook

```bash
git push --no-verify
```

Use this when you've done your own verification and need to get a push through that verify-context.sh is wrongly blocking. Document why in the commit message if possible.

### Pointing the shell at a different config temporarily

```bash
CLOUDSDK_ACTIVE_CONFIG_NAME=lumis gcloud firestore databases list
```

Env var overrides for a single command are safer than `gcloud config configurations activate` because they don't persist.

---

## Updating the safety config

If you add a new service account, change the project number, rename the repo, or otherwise need to change an expected value:

1. Update `CLAUDE.md` §1 (the canonical source).
2. Update `scripts/verify-context.sh` EXPECTED_* constants.
3. Update `scripts/deploy-safe.sh` PROJECT_ID.
4. Update `.githooks/pre-push` EXPECTED_HTTPS / EXPECTED_SSH.
5. Update `.envrc` exports.
6. Update this file.
7. Run `scripts/verify-context.sh --strict` to confirm the new values pass.
8. Commit all changes in a single commit titled `chore(safety): update account lock — <reason>`.

Never split the changes across commits — leaving the expected-values out of sync across files turns the hardening into noise instead of safety.

---

## Relationship to CLAUDE.md

`CLAUDE.md` §1 is the canonical statement of the account lock. This file is the *implementation* of that statement. If `CLAUDE.md` and these scripts disagree, `CLAUDE.md` wins — update the scripts to match.

When Claude Code starts a session in this repo, it reads `CLAUDE.md` first (auto-loaded), sees the account lock values, and is expected to run `scripts/verify-context.sh --strict` before any code write. If you're reading this as Claude: do that.

---

## Attribution

This hardening pattern is adapted from the PersonIQ repo, which Darrel has been using as the reference implementation across all production-critical projects. See `~/.claude/CLAUDE.md` → "Cross-Project Repo Hardening Pattern" for the full template.
