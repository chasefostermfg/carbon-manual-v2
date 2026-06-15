# Carbon User Manual — handoff & migration notes

This repository is a fork of [`crbnos/docs`](https://github.com/crbnos/docs) (the Fumadocs
site behind docs.carbon.ms) with a brand-new **User Manual** added — a written, zero-assumptions
tutorial that mirrors [Carbon Academy](https://learn.carbon.ms) for people who'd rather read than
watch. It uses real data from the **Acme Inc.** demo company throughout.

- **Live demo:** _(set after first deploy)_ `https://chasefostermfg.github.io/carbon-manual/`
- **Built with:** Fumadocs v15 · Next.js 15 · Tailwind v4 · MDX (unchanged from upstream).

## What was added (the manual)

Everything new lives behind a second sidebar root, **“User Manual”** (toggle at the top of the
sidebar), so it sits alongside the existing developer docs without disturbing them.

```
content/docs/manual/        # 30 MDX pages — the manual
  meta.json                 # sidebar order (mirrors Carbon Academy's 8 sections)
  index.mdx                 # Welcome
  walkthrough.mdx           # "Carbon in 15 minutes" — the end-to-end tutorial
  overview/ getting-started/ items/ selling/ manufacturing/
  buying/ inventory/ quality/ accounting/ developing/
components/manual/          # the UI "screenshot" component kit (see below)
  app-shot.tsx data-table.tsx record.tsx method-tree.tsx badge.tsx stats.tsx shell.tsx
```

**The UI mock kit** renders real Acme data as faithful, theme-aware (light/dark) Carbon screens —
crisp at any zoom and impossible to let go stale: `AppShot` (window chrome), `DataTable` (list
views), `RecordPanel`/`FieldGrid`/`Field` (detail views), `MethodTree` (BOM + routing), `StatusBadge`,
`Tag`, `Stat`/`StatGrid`, `CarbonShell` (app-shell mock). All are registered in `mdx-components.tsx`
and documented for authors in `../_research/AUTHOR-GUIDE.md`.

## Changes to the upstream app

**Content/feature (keep when migrating):**
- `content/docs/manual/**`, `components/manual/**`, and the new component registrations in
  `mdx-components.tsx`.
- `app/[[...slug]]/layout.tsx` — added the sidebar root toggle (User Manual ⇄ Developer Docs).

**Deploy-only (needed for static GitHub Pages; not needed on docs.carbon.ms):**
- `next.config.mjs` — when `BUILD_EXPORT=true`, emits a static export and supports
  `NEXT_PUBLIC_BASE_PATH`. With neither env var set, behavior is identical to upstream.
- `app/api/search/route.ts` — uses `staticGET` so search works on a static host. (Server builds
  still work; search just runs client-side from a prebuilt index.)
- `app/layout.tsx` — `RootProvider` configured for static search + base-path-aware asset URLs.
- `lib/layout.shared.tsx` — base-path-aware logo URL.
- Removed the `llms.mdx` / `llms-full.txt` route handlers and the `(home).bak` folder (the
  `.mdx`-in-route-segment handler is incompatible with `output: export`). The page-action
  "Copy Markdown" row in `app/[[...slug]]/page.tsx` was removed with it.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000  (manual at /manual)
```

## Build & deploy

```bash
# Static export for GitHub Pages (served under /carbon-manual):
./deploy.sh                                   # uses REPO + BASE_PATH defaults

# Or a plain static export to ./out:
BUILD_EXPORT=true NEXT_PUBLIC_BASE_PATH=/carbon-manual npm run build
```

## Migrating into docs.carbon.ms

1. Copy `content/docs/manual/`, `components/manual/`, and the manual additions in
   `mdx-components.tsx` and `app/[[...slug]]/layout.tsx` into `crbnos/docs`.
2. Since docs.carbon.ms is served at the domain root, **omit** `NEXT_PUBLIC_BASE_PATH` (build
   normally). The deploy-only changes above are optional there.
3. Replace the illustrative `AppShot` mockups with real product screenshots over time if desired —
   the component accepts any children, so you can drop an `<img>`/`<ImageZoom>` in place of a mock.
