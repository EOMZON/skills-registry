# Sanitization Rules

## Goal

Convert a private skill into a public registry entry without leaking:

- local paths
- secrets
- login state details
- private repo structure
- personal infrastructure assumptions

The objective is **parity-preserving redaction**:

- Keep method, process, and decision flow intact
- Redact sensitive operational details only
- Avoid collapsing full methodology into a discovery-only card
- Replace private values with public placeholders, not with missing steps

## Classification

Each skill should end in one of three buckets:

### `public`

Safe to publish with minimal editing.

Typical examples:

- thinking and research methods
- writing structures
- frontend/design direction
- generic deployment or testing flows without personal state details

### `sanitized`

Publishable only after redaction and public framing.

Typical examples:

- deployment flows with personal defaults removed
- pipelines that mention local folders or specific domains
- automation skills with genericizable service requirements

### `private-only`

Should remain private for now.

Typical examples:

- skills depending on active login state
- skills containing private account topology
- skills referencing tokens, secrets, or internal systems
- highly personal content mirror workflows

## Field-Level Redaction

### Paths

Replace absolute paths like:

- `/Users/zon/...`
- `~/.codex/...`

With:

- `/path/to/project`
- `$SKILL_ROOT`
- `/absolute/path/to/source`

Important:

- If the original text points to a reusable skill-relative helper or reference, keep that structure visible with a placeholder such as `$SKILL_ROOT/scripts/foo.mjs`
- If the original text points to a private env file, replace the value with a caller-supplied path such as `/path/to/.env`

### Secrets

Never publish:

- token values
- PAT values
- webhook URLs
- signing secrets
- auth cookies
- storage state contents

Replace with abstract requirements:

- `requires env var`
- `requires authenticated browser state`
- `requires service credential configured by user`

Do not over-redact public interface names that are themselves useful instructions:

- Keep environment variable names like `GITHUB_TOKEN`, `GH_TOKEN`, `VERCEL_TOKEN`
- Keep auth entrypoints like `gh auth login` or `vercel login`
- Redact secret values and private file locations, not the existence of the auth mechanism

### Private Repos / Domains

Replace:

- private repo names
- internal deployment URLs
- personal subdomain assumptions

With:

- `OWNER/REPO`
- `example.com`
- `your-project-domain`

### Account Identity

Remove or generalize:

- private team handles
- chat IDs
- personal usernames when not required for public use

### Stateful Files

Replace concrete file references like:

- local cookie databases
- `.env` file paths

With abstract dependency notes:

- `requires browser login state`
- `requires credentials configured in environment`

If a filename is only illustrating a generic integration contract, a sanitized placeholder filename is acceptable, for example:

- `/path/to/playwright-state.json`
- `/path/to/.env`

What must not leak is the real personal path or the contents of those files.

## Public Manifest Rules

- Keep one public `scene`
- Put tool and platform words into `keywords`
- Keep `dependencies` high level
- Add `review_flags` when the export still needs human review

## Manual Review Required

The exporter can help, but it cannot safely decide:

- final `scene`
- nuanced privacy boundaries
- whether a platform-specific workflow is too personal to open
- whether an example still leaks operational detail
- whether public method structure still matches the private source
- whether private `references/` should publish as sanitized public references
