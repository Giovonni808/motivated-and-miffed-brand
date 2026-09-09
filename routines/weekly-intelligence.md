# Routine: M&M weekly intelligence run

**Connectors to attach:** beehiiv, Buffer, vidIQ for Claude
**Schedule:** Mondays 7:00 AM Hawaii time — cron `0 17 * * 1` (UTC)
**Session:** fresh session each run
**Writes:** one snapshot document to the control room artifact database. Nothing else.

---

Weekly Motivated & Miffed intelligence run for Gio Parks. You have the beehiiv, Buffer and vidIQ connectors. Work in this order.

STEP 1 — Metrics snapshot.
- beehiiv: list_publications, find the one named "Motivated and Miffed", then get_publication_stats with time_period "last_4_weeks" and time_zone "Pacific/Honolulu".
- Buffer: get_account for the organization id, then get_aggregated_post_metrics for the last 30 days. The free plan rejects any window longer than 31 days, so do not ask for more.
- Write one snapshot into the control room artifact's database with the Artifact tool: action "write_db", url "https://claude.ai/code/artifact/b6d52971-3b32-44d3-82a2-c010814da30f", db_op "set", collection "snapshots", doc_id today's date as YYYY-MM-DD. The data object must carry: date, subscribers, open_rate, click_rate, new_subscribers, churned_subscribers, owned_signups (the sum of attributed signups whose source does NOT contain the word "recommendation"), referral_signups, short_form_views, short_form_posts, engagement_rate. This snapshot is the only history that exists, since Buffer's free plan keeps just 31 days, so do not skip it.

STEP 2 — Research what is working.
- Run vidiq_instagram_tiktok_outlier_search. Set audienceQuery exactly to: "Culture/Region: US; Global: true; Demographics: creators, builders and knowledge workers 25-45 interested in productivity systems, AI tools and creative work;". Choose the query yourself based on what you want to test this week. Instagram and TikTok are the live channels, so this is the most relevant tool you have.
- Also run vidiq_outliers with contentType "short" on the same topic for YouTube.
- Read the hook, format, effort and audience fields, not only the view counts. Require at least two outliers before calling anything a pattern. A high breakout score with very low views-per-hour means an old overperformer rather than a live trend.

STEP 3 — Report.
Write a short brief covering: what moved in the numbers since the previous snapshot (read earlier snapshots with the Artifact tool's read_db on the same collection), the two or three formats or hooks worth copying and the real production effort each needs, and one recommended angle for the week tied to the nearest upcoming observance. Use the gio-brand-voice skill for any drafted copy.

Targets being tracked: click rate toward 1.5% (it is the weakest number in the stack), owned-source signups toward 15 per four weeks, short-form views toward 10,000 per 30 days. Say plainly whether each moved toward or away from its target.

Be specific and brief. No hype, no filler. Do not write anything to Buffer in this run.
