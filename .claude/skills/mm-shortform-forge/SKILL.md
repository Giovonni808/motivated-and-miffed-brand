---
name: mm-shortform-forge
description: >
  Drafts finished short-form content for Motivated & Miffed by fusing three inputs: a measured area of
  opportunity from the control room, a format with a proven outlier track record from vidIQ, and one of
  Gio's real personal anchors. Produces posting-ready Instagram, TikTok and LinkedIn drafts, not
  suggestions. Use whenever Gio asks for short-form drafts, wants content built around what is actually
  underperforming, asks "what should I post", wants proven formats applied to his material, or asks to
  turn an area of opportunity into content. Triggers on "forge", "draft short-form", "what should I
  post", "make content for this opportunity", "proven format", "give me drafts". Interviews Gio for any
  personal detail a draft needs and that is not already on file.
---

# M&M SHORT-FORM FORGE

The engine that turns a measured problem into posting-ready content.

Three inputs, always. A draft missing any one of them is generic:

1. **The opportunity** — a number that is behind, read live, not guessed.
2. **The proven format** — a template with a documented outlier track record on Gio's platforms.
3. **The personal anchor** — a specific thing only Gio can say.

Load `gio-brand-voice` for voice, and `mm-carousel-cinematic` for any Instagram carousel brief.
This skill governs what gets drafted and why. Those govern how it sounds and looks.

---

## STEP 1 — Name the opportunity

Read the live numbers before drafting. Never open with a topic; open with a deficit.

- beehiiv: `list_publications` → the one named "Motivated and Miffed" → `get_publication_stats`
  (`time_period` "last_4_weeks", `time_zone` "Pacific/Honolulu"). Also `get_post_stats` on recent issues.
- Buffer: `get_account` → `get_aggregated_post_metrics` for the last 30 days. The free plan rejects
  windows over 31 days.

Tracked targets, in priority order:

| Target | Goal | What a draft must do about it |
|---|---|---|
| Click rate | 1.5% | Give the link a stated reason. Name what is on the other side. |
| Owned-source signups | 15 / 4 weeks | Point at something Gio owns, never only at a partner referral. |
| Short-form views | 10,000 / 30 days | Reach is the constraint, so the hook carries the whole job. |

State the deficit in one line before drafting. If every target is met, draft against the nearest
observance in the control room's date panel instead.

---

## STEP 2 — Pull a format with a track record

Never invent a format. Pull one that already outperformed on Instagram or TikTok.

```
vidiq_instagram_tiktok_outlier_search
  query: the angle being tested
  audienceQuery: "Culture/Region: US; Global: true; Demographics: creators, builders and knowledge
                  workers 25-45 interested in productivity systems, AI tools and creative work;"
```

Read `hook_0_3s`, `format`, `effort` and `execution`. Not the view count alone. Require two outliers
before treating anything as a pattern. Prefer a format whose `effort.time` is "within an hour" or
"within a day" unless Gio says he has a production window.

### Format library

Observed patterns, with the multiple over the creator's own median. Use these when a live pull is
unavailable, and refresh them when it is.

| Format | Track record | Effort | Best for |
|---|---|---|---|
| Static b-roll with text list | 234x | Under an hour | Views. Lowest barrier, no face, no voiceover. |
| Credibility anchor then payload | 61x | Under an hour | Clicks. "X did this for 40 years. I turned it into 4 prompts." |
| Narrated listicle with static overlays | 83x | Within a day | Views plus authority. Split screen, talking head bottom. |
| Workflow tutorial, screen recording | 93x | Within a week | Owned signups. Highest authority, highest effort. |
| Talking head plus screen recording | 208x | Within a day | Views. Fast pacing, dynamic captions. |

The credibility-anchor format is the one that converts to clicks, because the anchor earns the
right to ask. It is also cheap to make. Reach for it when click rate is the deficit.

---

## STEP 3 — Attach a personal anchor

The format is borrowed. The anchor cannot be. Match the deficit to a real thing Gio has done.

### On file (from `gio-brand-voice`)

| Anchor | The specific detail | Earns him the right to talk about |
|---|---|---|
| Same-night wedding edit | Hours, not days, to cut footage for the reception that night | Constraints, speed, cutting scope |
| $30K at Shangri La | Streamlined in-house video workflow, saved $30K in one year | Workflow, efficiency as a creative skill |
| "F*ck JavaScript" | Walked out with a Change of Major form, could not get a C++ | Quitting the wrong path, honest self-assessment |
| COVID Joint Information Center | Public health comms while misinformation spread | Clarity under pressure, accuracy as ethics |
| The Boto Incident | A word he did not know changed the whole room | Context before content, knowing the audience |
| 500K+ views | Commercial work for Vacations Hawaiʻi, Jack in the Box | Reach, what actually travels |
| Two worlds | Government comms and commercial production at once | An angle almost nobody else has |

### Check the enrichment file

`content/personal-inventory.md` in this repo holds present-tense material Gio has supplied: what he is
working on now, systems of his that failed, numbers he owns, opinions he will defend, and what he can
actually shoot. Read it before drafting. It is the difference between a draft that sounds like him and
one that sounds like his résumé.

### When the anchor is missing, ask

Every story on file is historical. If a draft needs something present-tense and the enrichment file
does not have it, **stop and ask Gio directly.** Ask two or three open questions, never a
questionnaire. Then write the answers into `content/personal-inventory.md` so the next run has them.

Do not paper over a missing anchor with a general observation. That is the exact failure this skill
exists to prevent.

---

## STEP 4 — Draft

Produce all three unless told otherwise:

**Instagram carousel** — follow `mm-carousel-cinematic` exactly. Caption plus slide list. Leave hex
values and font names out of the brief.

**Short-form script** (TikTok and Reels) — under 45 seconds. Write the first three seconds as a
separate labelled hook line, because that is what the outlier data measures. Mark where a screen
recording or b-roll goes.

**LinkedIn** — plain text, no hashtag block. This is where the government-plus-production angle lands
hardest, so use it.

### Non-negotiables

- The hook makes a specific claim with a real number or a named constraint. No question openers, no
  "here's why", no "let's talk about".
- The anchor appears in the first third. It is the credibility, so it cannot be a closing footnote.
- The call to action names what is behind the link. "Link in bio" alone is what a 0.35% click rate
  looks like. Where the platform allows a real link, use the public issue url from `get_post`.
- Voice rules from `gio-brand-voice` are binding: no em-dashes mid-sentence, no motivational-poster
  copy, no invented achievements, and none of the retired vocabulary ("deep work", "flow state",
  "systems thinking", "productivity tax", "bandwidth" for human capacity, "leverage" as a synonym
  for use, "move the needle" except ironically).
- Never fabricate a number. The documented set is: 10+ years production, 5+ years communications,
  $30K saved, 500K+ views, 846 subscribers, 214 issues published, 26.43% open rate, 0.35% click rate.

---

## STEP 5 — Self-check before filing

Read each draft back and answer these. A no means rewrite, not ship.

1. Could any other productivity account have posted this? If yes, the anchor is too weak.
2. Does the first line make a claim, rather than announce a topic?
3. Does the call to action say what is on the other side of the link?
4. Is every number in it documented?
5. Did any retired vocabulary survive?
6. Does it read like coffee, rather than a TED talk?

---

## STEP 6 — File it

Write each draft as a Buffer **idea**, never a post:

```
create_idea
  organizationId: from get_account
  content.title: "<issue or angle> — <format>"
  content.text: the full draft
  content.services: ["instagram"] | ["tiktok"] | ["linkedin"]
```

Buffer rejects a post draft for Instagram, TikTok or YouTube without media, so ideas are the only
working destination for text. Ideas carry no schedule and cannot publish. Never call `create_post`.
If Buffer rejects a service with no connected channel, refile with `content.services` omitted and say so.

Then report: the deficit, the format and its track record, the anchor used, and what was filed.
