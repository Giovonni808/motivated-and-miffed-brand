# Control Room

https://claude.ai/code/artifact/b6d52971-3b32-44d3-82a2-c010814da30f

One artifact, two tabs. **Dashboard** is for monitoring. **Studio** is for producing. They share one
database and one set of live numbers, which is the whole reason they are not separate pages.

## Dashboard

Targets strip, lead signal, newsletter health, social performance, acquisition sources, publishing
queue, waiting drafts, observance calendar, channel coverage, per-issue performance, and topic radar.
Every number is read live from beehiiv, Buffer and vidIQ with the viewer's own credentials.

## Studio

Three parts: the outlier lab, the angle chips, and the chat.

### Outlier lab

Search Instagram and TikTok for posts beating their own creator's median, then pick one and get a
replication brief rather than a draft. Search is manual because vidIQ bills 5 credits per call.

`vidiq_instagram_tiktok_outlier_search` returns prose rather than JSON, which is bad for a table and
ideal here. The page splits it for display and passes the untouched block to Claude, so nothing is
lost to a parser. If the shape ever changes, the cards degrade to raw text rather than breaking.

Each card offers two actions:

- **Work out how to replicate** sends the outlier into the chat as a replication brief.
- **Keep as angle** writes it into `angles` so it joins the chip rack and survives the session.

Rows in the dashboard's Topic Radar carry the same Replicate action, built from the numbers already
on screen so it costs no extra credits.

### The replication brief

Claude answers five points before drafting anything:

1. **The mechanism.** What made it work, in one sentence. "It was relatable" is rejected.
2. **What transfers and what does not.** Their audience and assets are not his.
3. **His version.** The same mechanism on one of his anchors, with the hook line written out.
4. **Production plan.** What to shoot, in order, with an honest time estimate.
5. **The kill criterion.** What would make it a bad idea for him specifically.

The full draft comes only if he asks after that. The point is to understand the mechanism before
spending an hour copying the surface of it.

### Angle chips Each angle carries the three inputs `mm-shortform-forge`
requires: a measured deficit, a format with a proven outlier track record, and a personal anchor.

#### Ranking

Unused angles first. Then by **whichever target is currently furthest below goal**, computed live from
the same metrics the Dashboard reads, rather than a fixed order. Used angles collapse into a row so a
good one can be reworked. An angle marked `spendable` warns before it re-runs.

#### What gets recorded

| Write | When | Why it matters |
|---|---|---|
| `angles/<id>.uses`, `.status`, `.lastUsedAt` | On draft | Drives the unused-first ranking |
| `angles/<id>.metricAtUse` | On draft | The metric value at the moment it was drafted |
| `drafts/<auto>` | On save | The kept draft, its angle, and `metricAtSave` |

`metricAtUse` and `metricAtSave` are the beginning of the real feedback loop: once the weekly routine
has banked a few snapshots, an angle can be judged against what the number did afterward rather than
against whether it got clicked.

## Where the voice comes from

`sample()` has no system prompt and cannot reach the account's skills, so the whole voice spec rides in
a leading user turn: the fingerprint, the hard rules including no em dashes and the retired vocabulary,
the documented number set, the present-tense anchors from `content/personal-inventory.md`, the format
library with its multiples, the production constraint, and the five-point output contract.

**That block goes stale.** When the inventory grows, update `RULES` in `control-room/index.html` to
match or the Studio drafts from old material.

## Adding angles without republishing

Angles live in the artifact database, so new ones can be written straight in:

```
Artifact action=write_db db_op=batch
  url  https://claude.ai/code/artifact/b6d52971-3b32-44d3-82a2-c010814da30f
  collection "angles", doc_id a slug, data: title, prompt, anchor, format, record,
             effort, deficit (click|owned|views), spendable, status, uses
```

## Collections

| Collection | Written by | Holds |
|---|---|---|
| `angles` | Seeded here, updated by the page | The chip set and its usage history |
| `drafts` | The page, on save | Kept drafts with the angle and metric they came from |
| `snapshots` | The weekly routine | Metric history, since Buffer keeps only 31 days |

## Limits worth knowing

- Drafting spends Gio's own Claude usage and asks permission on the first send. **Opening the page to
  read a number costs nothing**, because consent is per call rather than per page load.
- First text on the default tier takes 5 to 60 seconds, hence the Thinking state and the Stop button.
- Input is capped near 64 KiB per call, so a long thread eventually needs a new thread.
- vidIQ bills credits per call, so the radar reads once per open and never polls.
- Buffer free-plan insights cap at 31 days.
- Nothing here posts anywhere. Saving a draft stores it; it does not reach Buffer or any platform.

## The old Studio URL

https://claude.ai/code/artifact/01341fd8-3e3a-4a12-8e05-c3ec01b76694 now serves a pointer to this
page. It was a separate artifact for about an hour, which split the data across two databases that
could not read each other.
