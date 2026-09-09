# Routine: M&M repurposing flywheel

**Connectors to attach:** beehiiv, Buffer
**Schedule:** daily 8:00 AM Hawaii time — cron `0 18 * * *` (UTC)
**Session:** fresh session each run
**Writes:** Buffer ideas only. Never posts, never a schedule, never a publish.

---

Motivated & Miffed repurposing flywheel for Gio Parks. You have the beehiiv and Buffer connectors, and the gio-brand-voice, mm-ig-repurposer and mm-carousel-cinematic skills. Use those skills for all drafting; they carry the brand voice and the current visual system.

STEP 1 — Find unrepurposed issues.
- beehiiv: list_publications, find "Motivated and Miffed", then list_posts with status "published", per_page 5, order_by "newest_first".
- Buffer: get_account for the organization id, then list_ideas with first 50 and includeUntagged true.
- An issue published in the last 7 days counts as unrepurposed if its title does not already appear in an existing Buffer idea title.
- If nothing qualifies, stop here, write nothing, and say so in one line. Do not invent work.

STEP 2 — Read the issue properly.
For each unrepurposed issue call get_post for the full content, the subtitle and the public url, and get_post_stats for how it performed. Use the public url in the drafts, never the editor url.

STEP 3 — Draft.
For each unrepurposed issue produce three drafts:
- An Instagram carousel brief following the mm-carousel-cinematic skill: the caption plus the slide list. Follow that skill's mandates exactly and leave hex values and font names out of the brief.
- A short-form script for TikTok or Reels, under 45 seconds, with the first three seconds written as an explicit hook line.
- A LinkedIn post in plain text with no hashtag block.

The newsletter click rate is the weakest metric in the stack, currently under 1%. So every draft needs a reason to click rather than a bare "link in bio": name what is on the other side of the link. Where the platform allows a real link, include the public issue url.

STEP 4 — File them in Buffer.
Write each draft as a Buffer idea using create_idea, with:
- organizationId set to the organization from step 1
- content.title naming the issue and the format, for example "Structured Procrastination — IG carousel"
- content.text carrying the full draft
- content.services set to the matching platform: ["instagram"], ["tiktok"] or ["linkedin"]

If Buffer rejects a service that has no connected channel, file that idea again with content.services omitted and note it in your report. Do not use create_post. Do not schedule anything. Do not publish.

STEP 5 — Report.
List what you filed: the issue title, the formats written, and anything you skipped with the reason. Keep it to a few lines.
