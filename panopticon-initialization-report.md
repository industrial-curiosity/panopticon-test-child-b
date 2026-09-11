# Panopticon initialization report

## Result

**Complete with follow-up.** `panopticon/config.json` was written; review the non-blocking items below.

## Child repository

No actionable issues.

## Organization configuration

- **Where:** `GitHub organization settings for industrial-curiosity`
  **Issue:** could not query org secrets via `gh api` (not authenticated, or lacking org-admin permissions). Verify manually that these are configured:     secrets:   PANOPTICON_INSTANCE_TOKEN, PANOPTICON_LLM_API_KEY     variables: PANOPTICON_LLM_MODEL, PANOPTICON_LLM_ENDPOINT   Web UI: https://github.com/organizations/industrial-curiosity/settings/secrets/actions (secrets and variables are separate tabs)   Or locally via the gh CLI (run `gh auth login` first if not already authenticated):     gh secret list --org industrial-curiosity     gh variable list --org industrial-curiosity
  **Next step:** Follow the verification or configuration instruction above; this does not block local initialization.

- **Where:** `GitHub organization settings for industrial-curiosity`
  **Issue:** could not query org variables via `gh api` (not authenticated, or lacking org-admin permissions). Verify manually that these are configured:     secrets:   PANOPTICON_INSTANCE_TOKEN, PANOPTICON_LLM_API_KEY     variables: PANOPTICON_LLM_MODEL, PANOPTICON_LLM_ENDPOINT   Web UI: https://github.com/organizations/industrial-curiosity/settings/secrets/actions (secrets and variables are separate tabs)   Or locally via the gh CLI (run `gh auth login` first if not already authenticated):     gh secret list --org industrial-curiosity     gh variable list --org industrial-curiosity
  **Next step:** Follow the verification or configuration instruction above; this does not block local initialization.

- **Where:** `GitHub organization settings for industrial-curiosity`
  **Issue:** optional PANOPTICON_LLM_TIMEOUT_SECONDS (timeout_seconds): workflow default (or fixed instance action during CI)
  **Next step:** Follow the verification or configuration instruction above; this does not block local initialization.

- **Where:** `GitHub organization settings for industrial-curiosity`
  **Issue:** optional PANOPTICON_LLM_MAX_ATTEMPTS (max_attempts): workflow default (or fixed instance action during CI)
  **Next step:** Follow the verification or configuration instruction above; this does not block local initialization.

- **Where:** `GitHub organization settings for industrial-curiosity`
  **Issue:** optional PANOPTICON_LLM_MAX_CORRECTION_ATTEMPTS (max_correction_attempts): workflow default (or fixed instance action during CI)
  **Next step:** Follow the verification or configuration instruction above; this does not block local initialization.

- **Where:** `GitHub organization settings for industrial-curiosity`
  **Issue:** optional PANOPTICON_LLM_JOB_TIMEOUT_MINUTES (job_timeout_minutes): workflow default in reusable workflow
  **Next step:** Follow the verification or configuration instruction above; this does not block local initialization.

- **Where:** `instance repository metadata`
  **Issue:** could not resolve instance_default_branch (no GH_TOKEN/GITHUB_TOKEN or gh auth token available, or the GitHub API call failed) — re-run the bootstrap script once a token is available to pick it up (it refreshes this field on every rerun), or panopticon.org_diagram_link will attempt a live lookup itself when needed
  **Next step:** Make GitHub authentication available and rerun `python3 -m panopticon.init_repo --instance industrial-curiosity/panopticon-test`.

## Template/tooling

No actionable issues.

Rerun finalization after completing any listed action. This report contains configuration names and paths only; it never includes credential values.
