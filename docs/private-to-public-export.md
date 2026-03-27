# Private To Public Export

## Source

Recommended private author source:

- `/Users/zon/.codex/skills`

As of 2026-03-24, it is a local Git repository and can serve as the private author source.

## Target

Public target:

- `skills-registry/content/skills/<slug>/manifest.json`
- `skills-registry/content/skills/<slug>/SKILL.md`

Draft export target:

- `skills-registry/drafts/skills/<slug>/manifest.json`
- `skills-registry/drafts/skills/<slug>/SKILL.md`
- `skills-registry/drafts/skills/<slug>/references/*.md` (when available)

## Export Flow

1. Read private `SKILL.md`
2. Extract top-level metadata:
   - `name`
   - `description`
   - likely invoke token
3. Produce a first-pass manifest
4. Sanitize the Markdown body
5. Export sanitized `references/` markdown pack (if private source has one)
6. Add review flags
7. Export into `drafts/skills/<slug>/`
8. Run sync-parity audit (`npm run audit:sync`)
9. Manually set:
   - `scene`
   - `use_when`
   - `avoid_when`
   - `returns`
   - final visibility bucket
10. Only after review, promote the files into `content/skills/<slug>/`

## Export Outcomes

### Direct publish

- Goes straight to `public`

### Publish after edit

- Goes to `sanitized`

### Hold back

- Stays `private-only`

## Recommended First Public Batch

- `best-minds`
- `planning-with-files`
- `doc-coauthoring`
- `frontend-design`
- `zon-minimal-editorial`
- `webapp-testing`
- `vercel-deploy`
- `vercel-ship`

## Export Command

```bash
cd skills-registry
npm run export:public -- --src /absolute/path/to/private-skill --dest skill-slug
```

If you need to skip reference export:

```bash
npm run export:public -- --src /absolute/path/to/private-skill --dest skill-slug --no-references
```
