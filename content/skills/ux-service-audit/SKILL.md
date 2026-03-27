# UX Service Audit

Audit a complex end-to-end service experience across multiple touchpoints, roles, systems, channels, and handoffs; surface structural failures, service-design gaps, and prioritized fixes.

## Purpose

1. Run when the real UX problem is bigger than a page, bigger than a single user flow, or clearly spans channels, teams, or systems.
2. Audit the full service chain: users, scenarios, roles, touchpoints, channels, backstage processes, dependencies, handoffs, and failure states.
3. Surface structural service-design issues, not just page-level symptoms.
4. Always end with a prioritized service fix plan: immediate repairs, structural fixes, and validation signals.

## Trigger words

Use this skill any time the request contains: `全链路`, `service design`, `旅程`, `journey map`, `service blueprint`, `handoff`, `跨系统`, `多角色`, `多触点`, `审批流程`, `复杂流程`, `邮件+网页+人工`, `运营流程`, `客服流程`, `后台流程`, `service audit`, `从入口到完成`, `跨渠道`.

## Core stance

Do not treat a service problem as a screen problem.

Start by identifying:

1. primary users
2. secondary users or operators
3. the service promise
4. the major journey stages
5. channels and systems involved
6. backstage owners and dependencies
7. where trust, delay, confusion, or abandonment enters the chain

If the request starts from a single page but the failure clearly comes from upstream or downstream dependencies, say so and widen the audit scope.

## Non-goals

Do not spend the audit budget on these anti-patterns:

1. page-only critique when the break is cross-channel
2. pixel-polish feedback without service evidence
3. recommendations with no ownership, sequence, or validation
4. claiming root cause before mapping handoffs and backstage dependencies

## Input quality bar

If available, gather or request:

1. service scope and boundaries
2. primary and secondary roles
3. top critical scenarios or complaint clusters
4. known channels and systems
5. existing evidence:
   - support tickets
   - drop-off or completion data
   - failed cases
   - SLA or turnaround constraints
6. constraints:
   - policy
   - compliance
   - staffing
   - integration limits

If evidence is missing, proceed with assumptions and label confidence explicitly.

## Approach

1. **Set scope and confidence tags first** - Label findings as:
   - `high confidence`: directly observed from artifacts or live flow
   - `medium confidence`: inferred from partial evidence
   - `low confidence`: hypothesis requiring validation
2. **Define the service frame** - Clarify:
   - user segments
   - top tasks / jobs
   - business or service goal
   - primary success condition
   - major risks if the service breaks
3. **Map the journey** - Break the experience into:
   - discovery / entry
   - orientation
   - qualification / decision
   - action / submission
   - waiting / review / approval
   - confirmation
   - support / exception / recovery
   - return / follow-up / ongoing use
4. **Map touchpoints** - List what the user actually interacts with:
   - homepage / landing
   - product UI
   - forms
   - docs
   - email
   - chat
   - notifications
   - support
   - human operators
5. **Map backstage systems** - Identify:
   - internal tools
   - manual review steps
   - data syncs
   - policy / approval dependencies
   - state ownership
   - failure boundaries between systems
6. **Audit handoffs** - For each transition, ask:
   - who owns this moment?
   - what signal tells the user what happens next?
   - what happens if the handoff is delayed, denied, or broken?
   - can the user recover without contacting support?
7. **Audit service layers** - Always inspect:
   - user fit and scenario definition
   - journey coherence
   - touchpoint clarity
   - cross-channel consistency
   - backstage visibility
   - state transitions
   - approvals and waiting periods
   - trust and reassurance
   - error and recovery behavior
   - operator burden
   - measurement and feedback loops
8. **Service blueprint mindset** - Separate:
   - user actions
   - frontstage interactions
   - backstage actions
   - support systems
   - policies or constraints
9. **Handoff failure taxonomy** - Classify recurring failure shapes:
   - ownership gap
   - missing status signal
   - irreversible failure
   - channel mismatch
   - policy ambiguity
   - data sync drift
   - manual rescue dependency
10. **Priority rubric** - Use:
   - `P0` for broken service promises, dead-end handoffs, invisible waiting states, or failures that block completion
   - `P1` for serious confusion, repeated manual rescue, trust loss, or inefficient role handoffs
   - `P2` for inconsistency, redundancy, or operator friction that does not fully block the service
11. **Issue report** - For each issue, document:
   - priority
   - journey stage
   - touchpoint or handoff
   - symptom
   - root cause
   - user impact
   - operator or business impact
   - fix direction
12. **Fix planning** - Always separate recommendations into:
   - quick repairs
   - structural service fixes
   - instrumentation / validation
13. **Validation** - Define signals such as:
   - task completion
   - handoff success rate
   - waiting-state drop-off
   - support volume
   - manual rescue frequency
   - time to completion
14. **Pair implementation when needed** - For real product changes, pair with:
   - `ux-clarity-audit` for detailed page and flow review
   - `reference-board-lab` for visual mapping
   - `playwright` or `webapp-testing` for live flow verification
   - `frontend-design` when UI changes are required

## What good looks like

A strong service audit should help the team answer:

- Which service promise are we making, and to whom?
- Where does the service break before the user reaches value?
- Which issues are page symptoms versus backstage or ownership failures?
- What can be repaired quickly, and what requires structural redesign?
- How will we know the service is better for both users and operators?

## Required artifacts

By default, produce these artifacts in the final response:

1. Service frame brief
2. Evidence and confidence summary
3. Journey map summary
4. Frontstage/backstage blueprint slice
5. Handoff risk register
6. Prioritized issue backlog (`P0`/`P1`/`P2`)
7. Quick repairs vs structural fixes plan
8. Validation plan with leading and lagging signals

## Deliverable structure

Use this structure by default:

1. Scope and assumptions
2. Evidence and confidence
3. Users, roles, and service promise
4. Journey stages
5. Touchpoints, systems, and owners
6. Prioritized findings
7. Quick repairs
8. Structural fixes
9. Validation signals

## References

Use these references to keep audits consistent and repeatable:

- `references/service-frame-and-scope.md`
- `references/journey-blueprint-and-handoffs.md`
- `references/handoff-failure-taxonomy.md`
- `references/fix-planning-and-prioritization.md`
- `references/validation-and-instrumentation.md`

## Output format

```text
Scope & assumptions:
- ...

Evidence & confidence:
- Evidence: ...
- Confidence level: high / medium / low

Users & roles:
- Primary user: ...
- Secondary role / operator: ...
- Service goal: ...
- Service promise: ...

Journey stages:
1. Discovery / entry: ...
2. Orientation: ...
3. Action: ...
4. Waiting / approval: ...
5. Confirmation / recovery: ...

Touchpoints, systems, and owners:
- Frontstage: ...
- Backstage: ...
- Handoffs: ...
- Owners: ...

1. [P0] Dimension: ...
   - Confidence: high / medium / low
   - Stage: ...
   - Touchpoint / handoff: ...
   - Symptom: ...
   - Cause: ...
   - User impact: ...
   - Operator / business impact: ...
   - Fix direction: ...
2. ...

Quick repairs:
1. ...
2. ...
3. ...

Structural fixes:
1. ...
2. ...
3. ...

Validation signals:
- ...
- ...
```
