# M&M Connector Map

What the Motivated & Miffed stack can actually reach, and what the control room reads.

The control room is a published Claude artifact (`control-room/index.html`). It calls the
connectors live, with your credentials, at the moment you open it. No numbers are baked into
the page and nothing is stored between viewers.

## Wired into the control room

| Connector | Tools the page calls | Panel |
|---|---|---|
| beehiiv | `list_publications`, `get_publication_stats`, `list_posts` | Newsletter health, Where subscribers come from, Recent issues |
| buffer | `get_account`, `list_channels`, `get_aggregated_post_metrics`, `list_posts` | Social performance, Channel coverage, What's queued |
| vidIQ for Claude | `vidiq_trending_videos` | Topic radar |

The publication is resolved by name at load, so the page keeps working if the account gains
another publication. The Buffer organization is resolved from `get_account` the same way.

## Publishing channels

Buffer is the publishing path. Live today: Instagram, TikTok, YouTube.

Target set is six channels, so X, Threads and LinkedIn are still to connect. Two things gate that:

1. **Plan.** The account is on a free Buffer plan, which reports a hard cap of 3 channels and
   10 scheduled posts. A paid plan is required before a fourth channel will hold.
2. **Insights history.** Free-plan analytics are limited to the last 31 days. Any request for a
   longer window fails with a plan error, which is why the social panel reads a 30-day window.

Threads posting depends on what Meta's API exposes to Buffer at the time you connect it. Confirm
in Buffer before assuming Threads scheduling works the same way Instagram does.

## Connected but not in the control room

These are authorized on the account and available for workflows without further setup:

- **Content and design:** Canva, Gamma, Higgsfield AI, Lovable
- **Analytics breadth:** Supermetrics (200+ sources), Windsor.ai (320+), Coupler.io (400+)
- **Workspace:** Gmail, Google Calendar, Google Drive
- **Automation:** Zapier (9,000+ apps)
- **Research:** vidIQ (outlier search, keyword research, Instagram and TikTok outliers), Indeed

Adding any of them to the control room means declaring the connector and its tool names in the
artifact's `capabilities.mcp.servers` manifest, then observing one real response per tool before
writing the panel. A guessed response shape is the one thing that reliably breaks these pages.

## Skills already covering the agent layer

`gio-brand-voice`, `motivated-and-miffed`, `mm-ig-repurposer`, `mm-carousel-cinematic`,
`mm-ig-visual-director`, `mm-ebook-visuals`, `mm-landing-page-redesign`, `reel-cut`, `stop-slop`.

Drafting in voice, repurposing issues, carousel briefs and visual direction are handled here,
which is why the build focused on the assembly layer rather than rebuilding those capabilities.

## Observance calendar sources

Dates in the control room's "Dates worth pegging to" panel, verified September 2026:

- International Podcast Day, Sept 30 (fixed) — nationaldaycalendar.com, awarenessdays.com
- National Techies Day, Oct 3 (fixed) — nationaldaycalendar.com
- Get Organized Week, first full week of October (Oct 4-10, 2026) — checkiday.com
- National Work Life Week, Oct 5-9, 2026 — workingfamilies.org.uk
- World Mental Health Day, Oct 10 (fixed) — un.org, nationaldaycalendar.com
- National Work and Family Month, October (month) — nationaldaycalendar.com
- National Day of Unplugging, first Friday of March (Mar 5, 2027) — nationaltoday.com
- World Creativity and Innovation Week, Apr 15-21, day Apr 21 (fixed, UN) — un.org
- World Productivity Day, June 20 (fixed) — nationaldaycalendar.com
- National Simplicity Day, July 12 (fixed) — holidayscalendar.com
- Simplify Your Life Week, first full week of August (Aug 1-7, 2027) — nationaldaycalendar.com

Fixed-date entries recur without maintenance. The week-long ones move each year and need
a yearly refresh. The panel warns when every date on file has passed.

## Notes for future panels

- **beehiiv `list_posts` carries no public URL or slug.** Only `get_post` returns `url`,
  `slug`, `subtitle` and `thumbnail_url`, so linking to a live issue costs one call per post.
- **vidIQ bills credits per call** (5 for `vidiq_outliers`). Panels reading vidIQ must not
  poll on an interval. The radar reads once per page open with a 5-minute cache.
- **`vidiq_instagram_tiktok_outlier_search` returns prose, not JSON**, so its payload arrives
  as a string. It is unsuitable for structured panels and well suited to agent-run briefs,
  where the text is read rather than parsed. It is the best-matched research tool for this
  brand: Instagram and TikTok are the live channels, and it reports hook, format, effort and
  audience per outlier.
- **Buffer free-plan insights cap at 31 days**, so any longer window fails with a plan error.

## Buffer write paths

`create_post` supports `saveToDraft`, but a post draft still has to satisfy the platform's
minimum: Instagram and TikTok require an image or video, and YouTube requires a video plus
title and category. All three connected channels therefore reject a text-only draft.

`create_idea` accepts text with `content.services` platform targeting and no asset, and the
current plan allows 100 ideas against 10 scheduled posts. Ideas are the correct destination
for agent-written drafts, and the account already uses them this way.

## Routines cannot be created from a session

`create_trigger` succeeds but stores no connectors, so the fired session has no
`mcp__*` tools and fails immediately. The `connectors` parameter is not available for this
organization, and connectors on triggers made this way are limited to what the calling
session can pass through, which is nothing here.

Both routines must be created in the claude.ai Routines UI, where connectors attach
properly. The prompts are kept in `routines/`.

## When beehiiv metrics disappear from the page

The connector being healthy on the account and the page being allowed to call it are two different
things. beehiiv's directory entry changed at some point, and reconnecting it resets the per-artifact
consent, so the page starts getting refused while the same call works fine from a session.

Check in this order:

1. Call `get_publication_stats` from a normal session. If it answers, the connector is fine and the
   problem is the page's permission.
2. Open the artifact and allow beehiiv when it asks. If it never asks, check the connector settings
   for that artifact and switch beehiiv back on.
3. Read the error code the panel prints. `not_in_manifest` means the page is not allowed to call it
   for this viewer. `needs_reauth` means the credential lapsed. They have different fixes, which is
   why each panel names the code.
