# Personal Website

Monorepo for a personal website with profile, blog placeholder, and projects (including Onitama).

## Structure

- `packages/website` — Main site (profile, CV, blog, projects index)
- `packages/onitama` — Onitama game (chess-like strategy game)

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at http://localhost:5173

## Build

```bash
npm run build
```

## Preview (production build locally)

```bash
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Connect the repo in [Vercel](https://vercel.com)
3. Vercel will use the root `vercel.json` (build command, output directory)
4. Add your custom domain in Vercel project settings

## Adding a new project

1. Create `packages/my-project/` with its own `package.json` and code
2. Add `"my-project": "file:../my-project"` to `packages/website/package.json` dependencies
3. Run `npm install`
4. Add route `/projects/my-project` in `packages/website/src/App.tsx`
5. Create `packages/website/src/pages/ProjectMyProject.tsx` that imports and renders the project
6. Add a link on the Projects page
