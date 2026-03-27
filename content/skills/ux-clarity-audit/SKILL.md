# UX Clarity Audit

Review a website, app, or board as an end-to-end user experience: users, scenarios, journeys, entry points, flows, screens, states, and language; surface prioritized issues and actionable fixes.

## Purpose

1. Run whenever a page, board, site, or product flow feels "unclear", "hard to use", "not satisfying", or when the user asks for an `ux review`, `信息梳理`, or `信息架构` audit.
2. Surface what feels confusing, why it exists, how it hurts the user, and how to fix it.
3. Always end with three firm hard actions the next iteration should deliver.
4. Treat `首页` only as one touchpoint in a broader journey unless the user explicitly asks for homepage-only review.
5. Default to a full-chain audit: user -> scenario -> journey -> flow -> page -> state -> follow-through.

## Trigger words

Use this skill any time the request contains: `ux review`, `信息梳理`, `信息架构`, `网站不够清晰`, `看不懂`, `用户语言`, `review 并提出修改建议`, `为什么会有这些痛点`, `体验不舒服`, `第一印象卡住`, `页面很乱`, `首页`, `首屏`, `landing page`, `导航不清楚`, `弹窗打断`, `用户流程`, `全链路`, `旅程`, `journey`, `service design`, `onboarding`, `drop-off`.

## Core stance

Do not audit screens in isolation unless the user clearly wants a screen-only review.

Start with:

1. `Who is this for?`
2. `What are they trying to get done?`
3. `In what context are they doing it?`
4. `What path do they expect to take from entry to outcome?`
5. `Where does the current experience break across that path?`

If this information is missing, infer the most likely primary user and scenario from the product itself, and state the assumption.

## Input quality bar

Gather these when available:

1. target page or flow URL
2. intended primary user and top task
3. known breakpoints or drop-off points
4. recent evidence:
   - support feedback
   - replay/session notes
   - conversion or completion metrics
5. constraints:
   - policy
   - copy or legal limitations
   - technical constraints

If evidence is missing, proceed and mark confidence levels for findings.

## Approach

1. **Start from the first 30 seconds** - Identify what a first-time user sees first, what task they likely think they came to do, and what would make them hesitate, misread, or bounce.
2. **Model the service before critiquing the UI** - Define:
   - primary user or user segments
   - their top task / job-to-be-done
   - entry points into the experience
   - key path from entry to success
   - important side paths: recovery, support, trust, returning use
3. **Audit layers** - Always inspect:
   - user needs and context of use
   - service landscape: online and offline touchpoints if relevant
   - primary task clarity
   - IA hierarchy and top-task prioritization
   - user-language labeling vs internal jargon
   - onboarding flow and first-use friction
   - navigation, wayfinding, and information scent
   - key user flows: step-to-step continuity, dead ends, reversibility
   - screen states: loading, empty, error, success, permission, timeout
   - CTA density and competing asks
   - repetition / duplicated modules or duplicated decisions
   - trust signals and proof placement
   - accessibility of secondary modules
   - durability of patterns: whether the page still makes sense when motion, styling, or novelty are stripped away
   - measurement: how the team would know the flow actually improved
4. **Methods to combine** - Use the lightest mix that fits the problem:
   - heuristic evaluation for page and interaction quality
   - cognitive walkthrough for task completion
   - journey mapping for cross-step friction
   - service blueprint / service landscape thinking when multiple channels or backstage processes affect the experience
   - content and microcopy audit for language clarity
   - accessibility review for inclusive use
   - metrics framing for post-fix validation
5. **Audit modes** - Choose one explicitly:
   - `Page clarity review` - single screen, route, or module
   - `Homepage / entry audit` - first impression and route selection
   - `Flow audit` - one critical task from entry to completion
   - `Service audit` - multiple touchpoints, backstage dependencies, and channel handoffs
   If the user is vague, default to `Flow audit` rather than page-only review.
6. **Homepage overlay** - If the audited surface includes a homepage / landing / board index, always check five extra questions:
   - `Identity` - Can a newcomer tell what this is, who it is for, and why it matters within a few seconds?
   - `Freshness` - Does the page reflect the current product, current priorities, and current content reality?
   - `Navigation` - Is the next step obvious, and do labels give enough information scent to choose a path confidently?
   - `Interruption` - Is the user being blocked, nagged, or asked to commit before understanding value?
   - `Durability` - Is the structure fundamentally understandable, or is novelty or visual treatment carrying too much weight?
7. **Flow walkthrough** - When auditing a full journey, break it into steps:
   - entry
   - orientation
   - decision
   - action
   - confirmation
   - recovery / fallback
   - return / continuation
   For each step, note what the user expects, what the UI says, what can go wrong, and what should change.
8. **Priority rubric** - Use:
   - `P0` for issues that block orientation, trust, or task completion
   - `P1` for issues that create major hesitation, wrong turns, repeated friction, or hidden drop-off
   - `P2` for issues that add noise, redundancy, or polish debt without blocking the path
9. **Confidence tagging** - Mark each issue:
   - `high confidence`: directly observed in artifact/live flow
   - `medium confidence`: strongly inferred from partial evidence
   - `low confidence`: hypothesis that needs validation
10. **Issue report** - For each problem, document priority (`P0`/`P1`/`P2`), exact surface (`首页`, `结果页`, `某个模块`, `第 3 步`, `支付后确认页`, etc.), symptom, root cause, user consequence, and a concrete fix (UI, IA, copy, or flow change). Keep responses concise and user-facing.
11. **Required artifacts** - Include:
   - concise journey summary
   - prioritized issue list with confidence
   - three hard next actions
   - validation signals
   - open assumptions
12. **Hard actions** - Conclude with three practical, non-technical actions that move the experience toward novice-friendly clarity. Prefer changes in order, labeling, grouping, path simplification, and state coverage before recommending a full redesign.
13. **Validation** - When possible, define how the team should validate the fix:
   - task success
   - fewer wrong turns
   - lower drop-off
   - fewer support questions
   - better self-serve completion
14. **Pair implementation when needed** - If the user wants actual UI changes, recommend pairing this audit with `frontend-design`, `zon-minimal-editorial`, `reference-board-lab`, `webapp-testing`, or `playwright` instead of stopping at review text.
15. **Escalate heavy service problems** - If the experience spans multiple touchpoints, roles, approvals, channels, or system handoffs, route to or stack with `ux-service-audit` instead of forcing everything into a lightweight clarity review.

## References

Use these modular references when the audit needs more structure:

- `references/user-needs-and-scenarios.md` - define actors, jobs, triggers, and constraints
- `references/journey-and-service-map.md` - map stages, touchpoints, backstage dependencies, and breaks
- `references/flow-walkthrough.md` - step-by-step task audit from entry to recovery
- `references/evidence-intake.md` - capture evidence and open assumptions before critiquing
- `references/homepage-overlay.md` - review identity, freshness, navigation, interruption, and durability
- `references/validation-signals.md` - pick metrics and evidence for verifying improvements

## What good looks like

A strong audit should help the team answer:

- Which user and scenario are we optimizing for first?
- Where does the journey break before the user reaches value?
- Which pages are symptoms, and which problems are actually flow or service-design problems?
- What are the fastest fixes vs the structural fixes?
- How will we know the change worked?

## Anti-patterns

Avoid these failure modes:

- reviewing only the homepage when the real problem is later in the task flow
- critiquing visuals without first defining the user and their job
- listing isolated UI opinions without root causes
- recommending redesigns when copy, grouping, or order changes would solve the issue
- ignoring error, empty, loading, or confirmation states
- ignoring cross-channel handoffs such as email, chat, docs, support, or manual review
- declaring success without a validation path

## Deliverable structure

Use this structure by default:

1. Scope and assumptions
2. Evidence and confidence
3. Primary user and scenario
4. Journey or service path summary
5. Prioritized findings
6. Homepage overlay scorecard if relevant
7. Three hard next actions
8. Validation signals

## Browser / live app note

If the user wants the real product flow audited, prefer pairing this skill with browser execution (`playwright`, `webapp-testing`, or another live-browser skill) so the audit covers actual interaction, not just static reading.

## Borrowed best practices

The spirit of this skill should align with:

- NN/g style heuristic review for clarity, navigation, and usability
- GOV.UK style service design: start from user needs and map the whole problem
- IDEO-style human-centered design: users, context, prototype, iterate
- Google HEART-style thinking: connect experience fixes to measurable outcomes
- Figma-style critique discipline: match critique method to problem, align on goals, keep feedback actionable

## Output format

```text
Scope & assumptions:
- ...

Evidence & confidence:
- Evidence: ...
- Confidence level: high / medium / low

Primary user & scenario:
- User: ...
- Goal: ...
- Context: ...

Journey summary:
1. Entry: ...
2. Orientation: ...
3. Action: ...
4. Confirmation / recovery: ...

1. [P0] Dimension: ...
   - Confidence: high / medium / low
   - Surface: ...
   - Step: ...
   - Symptom: ...
   - Cause: ...
   - User impact: ...
   - Fix: ...
2. ...

If homepage / landing page is in scope:
- Identity: pass / risky / fail
- Freshness: pass / risky / fail
- Navigation: pass / risky / fail
- Interruption: pass / risky / fail
- Durability: pass / risky / fail

Next actions:
1. ...
2. ...
3. ...

Validation signals:
- ...
- ...
```
