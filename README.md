# Broadcast

Write a post once, pick which platforms it should go out to, and see a live
per-platform preview (with character limits) before you save it as a draft,
schedule it, or publish it. State is kept in Redux Toolkit and persisted to
`localStorage`, so your posts survive a page refresh.

## Run it

```bash
npm install
npm run dev
```

On CodeSandbox: upload/import these files, it will detect the Vite config
and install automatically. If it doesn't auto-start, run `npm run dev` in
the terminal.

## What's here

- `src/postsSlice.js` — post state: content, target platforms, status
  (`draft` / `scheduled` / `published`), scheduled time, timestamps.
- `src/platformSlice.js` — the list of platforms you can post to, each with
  a color and character limit. You can add/remove platforms from the UI
  ("Manage platforms" in the sidebar).
- `src/components/Composer.jsx` — the write-once form, platform picker, and
  the live preview strip.
- `src/components/PlatformPreviewCard.jsx` — the per-platform preview card
  with the character-count dial.
- `src/utils/storage.js` — thin `localStorage` persistence wired up in
  `store.js`.

## What I'd extend first

1. **Real publishing.** Right now "Publish now" just flips a status flag.
   The next real step is a backend that holds OAuth tokens per platform and
   an endpoint per platform (Twitter/X API, LinkedIn API, Meta Graph API for
   Instagram) that the "Publish" and "Schedule" actions call into.
2. **A scheduler worker.** Scheduled posts currently just sit with a future
   `scheduledAt` — nothing flips them to `published` automatically. That
   needs a small background job (cron, or a queue like BullMQ) that polls
   due posts and fires the publish call.
3. **Per-platform content, not one shared string.** Right now every
   platform gets the exact same text. A natural next step is letting each
   selected platform have its own editable variant (auto-filled from the
   main draft, but overridable) — useful since Twitter needs short copy and
   LinkedIn tolerates long-form.
4. **Auth + multi-user accounts.** Everything is local to one browser right
   now. Swapping `localStorage` for a real API (with the same Redux
   actions, just dispatched via thunks that call the API) is the path to
   multi-device and team use.
5. **Media attachments.** Image/video upload with per-platform aspect-ratio
   previews would close the gap with real social composers.
