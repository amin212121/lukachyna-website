e# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server (ng serve)
npm run build      # Production build
npm run watch      # Dev build with watch mode
npm test           # Run unit tests (Karma/Jasmine)
npm run serve:ssr:lukachyna-website  # Run SSR server after build
```

To run a single test file:
```bash
npx ng test --include='**/component-name.spec.ts'
```

## Architecture

Angular 19 personal/portfolio website with SSR, using standalone components throughout.

**Folder conventions:**
- `src/app/core/` — Singleton layout components: `header`, `footer`, `living-portrait` (3D animated character)
- `src/app/features/` — Page-level components (one per route): `home-landing`, `blog`, `projects`, `publications`, `contact`, `cms`
- `src/app/shared/` — Reusable UI: `elements/` (basic inputs, selectors), `layouts/`, `widgets/` (search-bar)

**Routing** (`src/app/app.routes.ts`): Flat route structure, no lazy loading, uses standalone routing API (`provideRouter()`).

**No state management library** — component-level state only, RxJS for reactive patterns.

## Key Technologies

- **Three.js** — `LivingPortraitComponent` renders a GLTF 3D model (`/public/3d-models/cartoonguy.glb`) with WebGL
- **GSAP + ScrollTrigger** — Scroll-based animations in `HomeLandingComponent`
- **Tailwind CSS + SCSS** — Tailwind for utility classes, SCSS for component-scoped styles
- **SSR** — Express server via `src/server.ts`, client hydration with event replay

## Conventions

- Component selector prefix: `ly-` (e.g. `ly-header`, `ly-living-portrait`)
- All components are **standalone** (`standalone: true`) with direct imports — no NgModules
- Default stylesheet: **SCSS**
- TypeScript strict mode is on (`strict`, `strictTemplates`, `noImplicitAny`, etc.)