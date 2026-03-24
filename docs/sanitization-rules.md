# Sanitization Rules

## Goal

Convert a private skill into a public registry entry without leaking:

- local paths
- secrets
- login state details
- private repo structure
- personal infrastructure assumptions

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

- `storage_state.json`
- local cookie databases
- `.env` file paths

With abstract dependency notes:

- `requires browser login state`
- `requires credentials configured in environment`

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
