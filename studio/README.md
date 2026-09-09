# Angle Studio

https://claude.ai/code/artifact/01341fd8-3e3a-4a12-8e05-c3ec01b76694

A chat surface with suggestion chips, where the chips are content angles built from real deficits and
real anchors rather than generic prompts. Click one and it drafts. Kept separate from the control room
on purpose: that one is for monitoring, this one is for working.

## What makes a chip

Each stored angle carries the three inputs the forge requires, so the draft that comes back is grounded:

| Field | Purpose |
|---|---|
| `title` | The chip label, and what shows in the chat as your message |
| `prompt` | The full instruction actually sent to Claude |
| `anchor` | Which personal anchor it is built on |
| `format` / `record` / `effort` | The proven format, its outlier multiple, and honest production cost |
| `deficit` | `click`, `owned` or `views`. Drives ranking. |
| `spendable` | True for angles that only work once, like the frog retraction |
| `status` / `uses` / `lastUsedAt` | Usage history, which is what makes the list change over time |

## How ranking works

Unused angles first. Then by deficit priority, click rate ahead of owned-source signups ahead of
short-form views, because that is the order the numbers are broken in. Then alphabetically for
stability. Used angles collapse into an "Already used" row rather than disappearing, so a good angle
can be reworked.

A `spendable` angle that has been used warns before it re-runs. The frog retraction lands because it
is the first retraction; a second one reads as a bit.

## Where the voice comes from

`sample()` has no system prompt and no access to the account's skills, so the whole voice spec rides in
a leading user turn: who Gio is, the voice fingerprint, the hard rules including no em dashes and the
retired vocabulary, the documented number set, the present-tense anchors from
`content/personal-inventory.md`, the format library with its multiples, the production constraint, and
the five-point output contract.

That block is the single most important thing in the page. When the inventory grows, update `RULES` in
`studio/index.html` to match, or the chat will draft from stale material.

## Adding angles without republishing

Angles live in the artifact's database, so new ones can be written straight in:

```
Artifact action=write_db db_op=batch
  url  https://claude.ai/code/artifact/01341fd8-3e3a-4a12-8e05-c3ec01b76694
  collection "angles", doc_id a slug, data the fields above
```

Saved drafts land in the `drafts` collection with the angle they came from, readable the same way with
`read_db`. That is the record of what was actually kept, which is a better signal than what was clicked.

## Limits worth knowing

- Drafting spends Gio's own Claude usage and asks permission on the first call in a view.
- The first text on the default tier takes 5 to 60 seconds, which is why the page shows "Thinking" and
  offers Stop.
- Input is capped around 64 KiB per call, so a very long thread eventually needs a new thread.
- Nothing here posts anywhere. Saving a draft stores it; it does not reach Buffer or any platform.
