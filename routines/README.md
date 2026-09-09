# M&M Routines

Two scheduled jobs make the control room self-feeding. Both must be created in the
**claude.ai Routines UI**, not from a Claude Code session.

## Why they can't be created from a session

Creating them programmatically succeeds but produces a Routine with no connectors
attached, so the fired session has no beehiiv, Buffer or vidIQ tools and fails at its
first step. The `connectors` parameter that would fix it is not available for this
organization. The Routines UI attaches connectors properly.

## How to create each one

1. Go to the Routines section of claude.ai and create a new routine.
2. Paste the prompt from the matching file below.
3. Attach the connectors that routine needs (listed at the top of each file).
4. Set the schedule (given in each file, in both Hawaii time and UTC).
5. Set it to start a fresh session each run, so it picks up the M&M skills cleanly.

## The two routines

| File | Schedule | Writes anything? |
|---|---|---|
| `weekly-intelligence.md` | Mondays 7:00 HST | Snapshot to the artifact database only |
| `repurposing-flywheel.md` | Daily 8:00 HST | Buffer **ideas** only, never posts |

Neither routine can publish. The flywheel writes Buffer ideas, which are drafts with
no schedule attached, so nothing reaches an audience without you moving it.

## Note on Buffer ideas versus post drafts

The flywheel files drafts as Buffer **ideas** rather than post drafts. Buffer rejects a
post draft for Instagram or TikTok unless it carries an image or video, and YouTube needs
a video plus a title and category, so a text draft cannot exist as a post draft on any of
the three connected channels. Ideas accept text with platform targeting, allow 100 on the
current plan, and match the workflow already in use in the account.
