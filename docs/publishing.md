# Publishing

## Goal

This registry is for **public, sanitized skills** only.

Private authoring happens upstream. Public publishing happens here.

## Flow

1. Author or update the private skill in the private source.
2. Export a public candidate with `scripts/export-public-manifest.mjs`.
3. Run sync guardrails (`npm run audit:sync`).
4. Review redaction output and method parity manually.
5. Place the reviewed files under `content/skills/<slug>/`.
6. Run:

```bash
npm run audit:sync:strict
npm run build:index
npm run validate
```

7. Commit the changes.

## Required Files Per Skill

- `content/skills/<slug>/manifest.json`
- `content/skills/<slug>/SKILL.md`
- `content/skills/<slug>/references/*.md` when private source includes references

## Review Checklist

- No absolute local paths
- No tokens, webhook URLs, PATs, or auth file paths
- No private repo names or internal domain assumptions
- `scene` is correct
- `use_when` and `avoid_when` are concrete
- `inputs` and `returns` are useful to both humans and agents
- Core method structure is still recognizable compared with private source
- Reference packs are published (or intentionally omitted with reviewer sign-off)
