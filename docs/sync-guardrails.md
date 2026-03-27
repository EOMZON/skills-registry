# Sync Guardrails

## Goal

Keep private and public skill versions aligned on method, process, and focus while only redacting sensitive details.

## Guardrails

`scripts/audit-sync-parity.mjs` enforces three checks:

1. Method-parity drift
   - Detects heavy compression from private `SKILL.md` to public `SKILL.md`
   - Detects low heading coverage between private and public structures
2. Reference-pack publication
   - Detects when private `references/` markdown exists but public `references/` is missing or partial
3. Sensitive leak scan
   - Detects leaked local paths, auth-state file names, webhook URLs, and token-like values in public markdown

## Usage

```bash
cd skills-registry
npm run audit:sync
```

Strict mode for CI or release gates:

```bash
npm run audit:sync:strict
```

Custom source/target paths:

```bash
node scripts/audit-sync-parity.mjs \
  --private-root /path/to/private/skills \
  --public-root /path/to/skills-registry/content/skills \
  --out /path/to/report.json \
  --strict
```

## Report

Default output:

- `reports/private-public-sync-report.json`

The report contains:

- global issue counts by severity
- per-skill compression and heading/reference coverage metrics
- actionable issue codes

## Release Workflow

1. Export sanitized draft from private source:
   - `npm run export:public -- --src /abs/private/skill --dest skill-slug`
2. Review draft redaction and method parity
3. Promote into `content/skills/<slug>/`
4. Run `npm run audit:sync:strict`
5. Run `npm run build:index && npm run validate`
6. Commit
