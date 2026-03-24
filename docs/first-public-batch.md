# First Public Batch

## Goal

Start with a batch that is:

- representative
- reusable
- low-risk to open
- strong enough to define the public voice of the registry

## Recommended `public` batch

- `best-minds`
  - Strong method skill, low private-state coupling, excellent public entry point.
- `doc-coauthoring`
  - Portable writing workflow with clear external reuse value.
- `frontend-design`
  - Strong stylistic signature and low privacy risk.
- `webapp-testing`
  - Clear engineering value and direct reuse for developers.
- `mcp-builder`
  - Strong technical positioning for engineering users.
- `theme-factory`
  - Shows system-level design thinking without sensitive infra coupling.
- `img-handdrawn-run-report`
  - Good example of “output-first” skill value beyond prompt snippets.
- `vercel-deploy`
  - Useful, broadly understandable shipping skill.

## Recommended `sanitized` batch

- `github-ops`
  - Needs removal of token, `.env`, and personal script-path assumptions.
- `github-repo-bootstrap`
  - Needs removal of personal owner/PAT examples.
- `vercel-ship`
  - Needs removal of Zon-specific domain defaults and token-loading details.
- `best-minds-board`
  - Strong showcase skill, but currently too coupled to absolute paths and personal board roots.

## Hold Back For Now: `private-only`

- `xhs-playwright-cli`
  - Too tied to login state and local auth files.
- `feishu-e2e-runner`
  - Depends heavily on local cookies/profile state.
- `music-board-netease-album-sync`
  - Too bound to a personal project and local layout to open immediately.

## Practical First Step

If we want the fastest safe first migration, start with these 8:

- `best-minds`
- `doc-coauthoring`
- `frontend-design`
- `webapp-testing`
- `mcp-builder`
- `theme-factory`
- `img-handdrawn-run-report`
- `vercel-deploy`

Then add the first sanitized 4 after the redaction rules have been tested in practice.
