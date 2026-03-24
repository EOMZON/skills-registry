# Publishing

## Goal

This registry is for **public, sanitized skills** only.

Private authoring happens upstream. Public publishing happens here.

## Flow

1. Author or update the private skill in the private source.
2. Export a public candidate with `scripts/export-public-manifest.mjs`.
3. Review redaction output manually.
4. Place the reviewed files under `content/skills/<slug>/`.
5. Run:

```bash
npm run build:index
npm run validate
```

6. Commit the changes.

## Required Files Per Skill

- `content/skills/<slug>/manifest.json`
- `content/skills/<slug>/SKILL.md`

## Review Checklist

- No absolute local paths
- No tokens, webhook URLs, PATs, or auth file paths
- No private repo names or internal domain assumptions
- `scene` is correct
- `use_when` and `avoid_when` are concrete
- `inputs` and `returns` are useful to both humans and agents
