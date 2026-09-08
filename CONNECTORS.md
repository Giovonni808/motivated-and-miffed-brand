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
