## Codex Memory Operations (Manus)

This is your cheat sheet for backing up and querying "Codex memory" from everything stored in `C:\Vercel\Manus`.

All commands below assume you run them from `C:\Vercel` in a terminal.

---

### 1. One‑Time Setup

You need an OpenAI API key in the environment:

```powershell
setx OPENAI_API_KEY "sk-...your-key-here..."
```

Then open a **new** terminal so `OPENAI_API_KEY` is available.

---

### 2. Full Memory Backup (build index)

Run this whenever you want a fresh snapshot of everything in `Manus/`:

```powershell
cd C:\Vercel
node Manus\scripts\build-codex-memory.mjs
```

What it does:

- Walks `Manus/` recursively.
- Reads all `.md`, `.txt`, `.html` files.
- Chunks each file into ~2000 characters.
- Calls `text-embedding-3-small` to embed each chunk.
- Writes a vector index to:  
  `Manus\codex-memory-index.json`.

Trigger phrases you might say that mean "run this":

- **backup memory / backupmemer / memory back / total recall**
- "full Codex backup", "store everything in Manus", etc.

When you ask for any of those, you’re really saying:

> "Run `node Manus\scripts\build-codex-memory.mjs` to refresh the index."

---

### 3. Query Memory (search past work)

Use this to ask, "What did we do about X?" based on the Manus index.

```powershell
cd C:\Vercel
node Manus\scripts\query-codex-memory.mjs "mobile nav fix"
```

What it does:

- Loads `Manus\codex-memory-index.json`.
- Embeds your query.
- Scores every stored chunk by similarity.
- Prints the **top 5 file/chunk matches** so you can open them.

If you say things like:

- "memory recall", "load memory", "total recall", "remind me what we did on Consensus Engine"

then the mental translation is:

> "Run `query-codex-memory.mjs` with my question and tell me the top matches."

---

### 4. Airtable‑Related Memory

Anything about **Airtable** is documented already in Manus:

- `Manus\airtable_create.txt`
- `Manus\airtable_pat.txt`
- `Manus\airtable_rate*.txt`

If you say:

- "airtable memory access", "how do we talk to Airtable again?", "load Airtable instructions"

the right move is:

1. Make sure the index is fresh:
   ```powershell
   node Manus\scripts\build-codex-memory.mjs
   ```
2. Query for Airtable:
   ```powershell
   node Manus\scripts\query-codex-memory.mjs "Airtable API key and PAT usage"
   ```
3. Open the top‑matching Manus files it prints and follow those instructions.

---

### 5. How to Interpret Future Questions

When you (future you) ask things like:

- "backupmemer", "memeory back", "total recal", "load memeour"

they map to **one of two actions**:

1. **Rebuild the index** (refresh snapshot of Manus)  
   → `node Manus\scripts\build-codex-memory.mjs`
2. **Query the index** (find something we already documented)  
   → `node Manus\scripts\query-codex-memory.mjs "your question"`

If the intent is unclear, answer both:

- First, remind yourself of these two commands.
- Then decide whether you need a fresh backup (build) or just a lookup (query).

Keep this file (`codex-memory-operations.md`) as the anchor: any time "memory" or "recall" comes up, this is the spec.  

