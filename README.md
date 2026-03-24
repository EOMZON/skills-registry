# Skills Registry

Public, machine-readable registry for Zon skills.

This repo is the **public registry layer**, not the private authoring layer.

## Layers

1. Private author source
   - recommended current source: `/Users/zon/.codex/skills`
   - can contain local paths, private state, login reuse, internal deployment details
2. Public registry
   - this repo
   - stores sanitized skill manifests and public `SKILL.md`
3. Public site
   - a separate renderer repo/site
   - should read from this registry and not hand-author content

## Registry Principles

- Public object model: `skill` only
- Public navigation: scenario-first
- Machine truth source: JSON
- Human longform: Markdown
- Public registry must never depend on private absolute paths or secrets

## Directory Layout

```text
schema/
  skill.schema.json
  registry-index.schema.json
  scene-taxonomy.schema.json

content/
  scenes.json
  registry.json
  skills/<slug>/
    manifest.json
    SKILL.md

docs/
  publishing.md
  sanitization-rules.md
  private-to-public-export.md

scripts/
  build-registry-index.mjs
  validate-registry.mjs
  export-public-manifest.mjs
```

## Quick Start

```bash
cd skills-registry
npm run build:index
npm run validate
```

## Consumption

Agent-friendly entry points:

- `content/registry.json`
- `content/skills/<slug>/manifest.json`

Human-friendly entry points:

- `content/skills/<slug>/SKILL.md`
- `docs/scene-taxonomy.md`
- `docs/sanitization-rules.md`

## Notes

- `registry.json` is generated from `content/skills/*/manifest.json`.
- `export-public-manifest.mjs` is a bootstrap exporter, not a final publishing oracle.
- Human review is still required for `scene`, `use_when`, `avoid_when`, and final redaction quality.

## First Public Batch

Recommended first batch:

- `best-minds`
- `doc-coauthoring`
- `frontend-design`
- `webapp-testing`
- `mcp-builder`
- `theme-factory`
- `img-handdrawn-run-report`
- `vercel-deploy`

Recommended first sanitized batch:

- `github-ops`
- `github-repo-bootstrap`
- `vercel-ship`
- `best-minds-board`
