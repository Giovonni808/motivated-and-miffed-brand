# Motivated & Miffed — Master Brand Database
### GitHub Repository Setup & AI Integration Guide

This repository is the single source of truth for the **Motivated & Miffed** brand. It contains the full brand database in two formats, designed to be used with Claude, ChatGPT, Manus AI, and any other AI tool.

---

## Files in This Repo

| File | Format | Best for |
|---|---|---|
| `motivated-and-miffed-brand-database.md` | Markdown | ChatGPT Custom GPT uploads, Manus AI, human reading |
| `motivated-and-miffed-brand-database.json` | JSON | Programmatic access, API integrations, structured queries |

---

## Raw File URLs (use these to connect AI tools)

```
https://raw.githubusercontent.com/Giovonni808/motivated-and-miffed-brand/main/motivated-and-miffed-brand-database.md

https://raw.githubusercontent.com/Giovonni808/motivated-and-miffed-brand/main/motivated-and-miffed-brand-database.json
```

---

## Connect to ChatGPT (Custom GPT)

### Option A: Upload as Knowledge File (Easiest)
1. Go to chatgpt.com → profile → My GPTs
2. Create a GPT or edit an existing one → Configure tab
3. Under Knowledge, click Upload files
4. Upload `motivated-and-miffed-brand-database.md`
5. In the Instructions box, paste this system prompt:

```
You are a content assistant for Motivated & Miffed, a productivity newsletter by Giovonni Parks.
Use the uploaded brand database as your primary reference for all content.
Always write in Giovonni's voice — dry, analytical, calm, and occasionally self-deprecating.
Never use hype language, motivational fluff, or corporate jargon.
Default to the Letter from the Editor format when no format is specified.
Always end with: Stay MOTIVATED, Gio
```

### Option B: Live Fetch via Actions (Always up to date)
In your Custom GPT → Configure → Actions → Create new action, add this schema:

```json
{
  "openapi": "3.0.0",
  "info": { "title": "M&M Brand Database", "version": "1.0.0" },
  "servers": [{ "url": "https://raw.githubusercontent.com/Giovonni808/motivated-and-miffed-brand/main" }],
  "paths": {
    "/motivated-and-miffed-brand-database.md": {
      "get": {
        "operationId": "getBrandDatabase",
        "summary": "Fetch the latest M&M brand database",
        "responses": { "200": { "description": "Brand database in Markdown" } }
      }
    }
  }
}
```

---

## Connect to Manus AI

1. Start a new Manus agent or task
2. In the Context / Instructions section, provide the raw GitHub URL:

```
Please refer to the Motivated & Miffed brand database at this URL before generating any content:
https://raw.githubusercontent.com/Giovonni808/motivated-and-miffed-brand/main/motivated-and-miffed-brand-database.md
```

3. Add this instruction to your Manus agent:

```
You are a content assistant for Motivated & Miffed.
Treat the brand database at the URL above as your core reference.
Always write in Giovonni Parks' voice.
Default to the Letter from the Editor format unless a format is specified.
End every piece with: Stay MOTIVATED, Gio
```

---

## Updating the Database

When you make changes to your M&M brand in Claude (Cowork):

1. Ask Claude: "Please regenerate the master brand database from my M&M skill"
2. Claude produces updated versions of both files
3. Go to this repo → click the file → click the pencil icon (edit) → paste new content → commit
4. The raw URL stays the same — all connected tools pick up the update automatically

---

## Connecting to Other Tools

| Tool | How to connect |
|---|---|
| **Claude (Cowork)** | Already connected via SKILL.md — no action needed |
| **ChatGPT Custom GPT** | Upload file OR use Actions schema above |
| **Manus AI** | Paste URL or contents into agent context |
| **Zapier / Make** | Use a Fetch URL step to pull the JSON file |
| **Any LLM with URL access** | Share the raw GitHub URL as a reference link |

---

*Maintained by Giovonni Parks / Motivated & Miffed*
*Database regenerated via Claude (Cowork) from SKILL.md*
