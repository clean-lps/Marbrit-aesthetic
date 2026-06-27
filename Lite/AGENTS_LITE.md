# Agents_1 — Optimized Designer Workflow

## Stack
React 18+ | TypeScript strict | Tailwind v4 (`@theme` block, no hex) | Vite | GSAP (dynamic import) | Motion | Lenis

## Architecture
```
src/
├── features/{feature}/domain/      # Types, interfaces (zero deps)
├── features/{feature}/application/ # Hooks, use cases
├── features/{feature}/infrastructure/ # React, API, stores
├── shared/ui/   # Primitives: Button, Card, Input, Modal, Badge, EmptyState
├── shared/lib/  # Utilities
├── shared/types/
├── shared/config/ # Routes, seo constants
├── index.css     # @theme block
└── main.tsx
```
**Dependency flow:** infrastructure → application → domain (never inward)

## Phases — Execute in order. Confirm with user between phases.

---

### Phase 0 — Setup
If no `package.json`:
1. `cp -r ../template/* .` then edit `package.json` (name, version) + `index.html` (title, meta, favicon, theme-color)
2. `powershell -File setup.ps1` to install deps
3. Create `CLIENTE-BRIEF.md` if missing

**Env vars (always):**
```
.env.example:  VITE_API_URL=  VITE_SITE_URL=
.env.local:    VITE_API_URL=http://localhost:3000  VITE_SITE_URL=http://localhost:5173
```

**Deployment config:**
```
public/_redirects:  /*  /index.html  200
vercel.json:  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**Path aliases:** Verify `tsconfig.json` has `"paths": { "@/*": ["./src/*"] }` and `vite.config.ts` has `resolve.alias: { "@": resolve(__dirname, "./src") }`

---

### Phase 1 — Client Grill (one question at a time)
1. ¿Nombre del proyecto/marca?
2. ¿Industria? (fintech, lujo, SaaS, ecommerce, salud, educación, etc.)
3. ¿Audiencia objetivo? (edad, perfil, dispositivo)
4. ¿Sitio existente a mejorar? Si sí → pedir URL
5. ¿URL de referencia de estilo?
6. ¿Referencias visuales adicionales?
7. ¿Tono/vibe? (lujoso/oscuro · minimal/editorial · playful/colorido · técnico/preciso · orgánico/natural · brutalista)
8. ¿Colores/tipografías existentes o propongo?
9a. ¿Secciones de inicio? (hero, features, pricing, testimonios, FAQ, CTA, footer, orden)
9b. ¿Páginas adicionales? (About, Blog, Contact, Pricing, Login, Dashboard, etc.)
10. ¿Funcionalidades especiales? (animaciones, 3D, chat AI, formularios multi-paso, APIs, auth, admin)
11. Cada botón/enlace: ¿a dónde lleva? (scroll, ruta interna, modal, WhatsApp, email, webhook)

→ Guardar en `CLIENTE-BRIEF.md`. Presentar resumen al cliente. Esperar confirmación.
→ Luego usar `/ui-ux-pro-max` para sugerir 2-3 opciones de estilo, paleta y tipografía.

---

### Phase 1.5 — Navigation Architecture (planning only, no code)

**Layout strategy:**
```
RootLayout (Navbar + Footer):  /  /about  /pricing  /contact  /legal/*
BlogLayout (Navbar + sidebar):  /blog  /blog/:slug
DashboardLayout (sidebar + topbar, no footer):  /dashboard  /dashboard/settings (noindex)
AuthLayout (minimal):  /login (noindex)
```

**Nested routes pattern:**
```tsx
<Route element={<RootLayout />}>
  <Route path="/" element={<HomePage />} />
  <Route element={<BlogLayout />}>
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:slug" element={<BlogArticlePage />} />
  </Route>
</Route>
<Route element={<AuthLayout />}>
  <Route path="/login" element={<LoginPage />} />
</Route>
```

**ROUTES constant** at `src/shared/config/routes.ts`.

**Navbar**: sticky + backdrop-blur. Mobile: hamburger → full-screen drawer.
**Footer**: columnar links (Product, Company, Legal).

**Action mapping** (every CTA → route/modal/scroll/action). Write `ARCHITECTURE.md`. Append to `CLIENTE-BRIEF.md`.

---

### Phase 2 — Design System

Build **Navbar + Footer** first with plain Tailwind + `@theme` tokens (no shared/ui imports). Wire up layouts in `App.tsx` with `<ScrollRestoration />`.

Generate `src/index.css` with `@theme` block:
- OKLCH colors → `--color-*`
- Fonts → `--font-*`
- Radius → `--radius-*`
- Animations → `--animate-*`
- Zero hardcoded hex

Run `/colorize` + `/typeset`. Populate `DESIGN.md` with token tables.

---

### Phase 3 — Component Architecture

Build `shared/ui/`: Button, Card, Input, Modal, Badge, EmptyState + `index.ts`
- Strict TypeScript, `interface ComponentNameProps`
- All states: hover, active, focus-visible, disabled (interactive); loading, empty, error, populated (data)
- 150ms transitions, `@starting-style` on Modal
- Use `/ui-craft:shape` for wireframe-first, `/extract` for repeated patterns

**Error boundaries per layout** via `react-error-boundary`.

Refactor Navbar/Footer to use shared/ui primitives.

---

### Phase 4 — Build Sections & Pages

**Code splitting (every page):**
```tsx
const HomePage = lazy(() => import("@/features/home/infrastructure/HomePage"))
```
Wrap routes in `<Suspense fallback={<PageLoader />}>`.

For each section: `/add-ui` → 5 directions → user chooses → build (full layout, all states, responsive, CTAs wired).

**Mini-workflows:**
- Forms: `react-hook-form` + `zod` + `zodResolver`
- Charts: `recharts` + `<ResponsiveContainer>`
- Carousels: `embla-carousel-react` (native) or `swiper` (touch)
- Dark mode: `next-themes` `<ThemeProvider attribute="class">`
- API: `axios` with interceptors for 401/403/500
- AI Chat: pre-built at `src/features/ai/`

Test each section at 375px · 768px · 1280px · 1920px.

---

### Phase 5 — Animations, Motion & 3D

**Lenis (smooth scroll — always first):**
```tsx
<ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
```
Connect to GSAP: `lenis.on("scroll", ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t*1000))`.

**Decision tree:** CSS `animation-timeline: view()` (simple reveals) → GSAP ScrollTrigger (parallax, scrub, pin) → View Transitions API (page transitions) → Motion (spring, gestures, AnimatePresence) → R3F (3D, lazy load).

**GSAP — always dynamic import inside `useEffect`/`useLayoutEffect`:**
```tsx
useEffect(() => { const [{default:gsap},{ScrollTrigger},{SplitText}] = await Promise.all([import("gsap"),import("gsap/ScrollTrigger"),import("gsap/SplitText")]); gsap.registerPlugin(ScrollTrigger, SplitText); ... }, [])
```

**Hero entrance:** `useLayoutEffect` — GSAP SplitText chars stagger + subtitle/CTA/Badge fade. Total < 1.5s.

**R3F:** Always `React.lazy()` — never static `import { Canvas }`. Use `useFrame` over `setInterval`. Dispose on unmount. CSS perspective transform for simple 3D.

**Radix UI:** Namespace imports only, never barrel: `import * as X from "@radix-ui/react-X"`.

**Micro-interactions:** `/micro-interactions` skill.

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` on everything. Only animate transform/opacity. Remove `will-change` after animation.

---

### Phase 6 — SEO & Accessibility

**Prerender static routes** with `vite-plugin-prerender`:
```ts
prerender({ staticDir: resolve(__dirname, "dist"), routes: ["/", "/about", "/pricing", "/contact", "/blog", "/legal/privacy", "/legal/cookies"] })
```
Dynamic routes → sitemap.xml or fetch at build time.

**SEOHead per page** (`react-helmet-async`):
- Title: "Page | Site" (max 60), description: max 160 chars, canonical, ogImage (1200×630), twitterCard
- `noindex` on login/dashboard/admin/thank-you

**JSON-LD:** Article | Organization | FAQPage | BreadcrumbList | Product.

**robots.txt**: disallow `/login`, `/dashboard`, `/admin`. Point to sitemap.

**Core Web Vitals:** LCP < 2.5s (preload hero image), CLS < 0.1 (set img w/h), INP < 200ms (avoid heavy main thread).

**Accessibility:** skip link, focus-visible, labels, alt text, heading hierarchy. Run `/a11y` + `/critique`.

---

### Phase 7 — Quality Gate

1. `/audit` → `/polish` → `/harden` → `/delight`
2. `npm run build` (zero warnings, prerender OK)
3. `npx tsc --noEmit` (zero errors)
4. `npm run analyze` (verify chunk separation)
5. Images: WebP, w/h set, `loading="lazy"` below fold, preload above-fold
6. Lighthouse: LCP < 2.5s · CLS < 0.1 · INP < 200ms · SEO ≥ 90

**Final summary:** pages built, tokens used, animation breakdown, prerendered routes, bundle size, Lighthouse.

---

### Phase 7.5 — Documentation

Update `DESIGN.md` (tokens, component API, examples, do/don't), `ARCHITECTURE.md` (folder structure, layout strategy, route map, component hierarchy, state mgmt, animation decision tree, bundle composition), `CLIENTE-BRIEF.md`.

---

## Toolbox (quick ref)

| Phase | Deps |
|-------|------|
| 0 | react/react-dom, typescript, tailwindcss/@tailwindcss/vite, @biomejs/biome |
| 2 | @fontsource-variable/geist, next-themes |
| 3 | cva/clsx/tailwind-merge, @radix-ui/* (namespace imports), @base-ui/react, lucide-react, sonner, vaul, zustand, react-error-boundary, vitest/@testing-library/* |
| 4 | react-router-dom, react-hook-form+zod+@hookform/resolvers, recharts, embla-carousel-react/swiper, cmdk, input-otp, react-day-picker, react-resizable-panels, date-fns, axios, ai+@ai-sdk/react, @ridemountainpig/svgl-react |
| 5 | gsap+@gsap/react, motion, lenis, three+@react-three/fiber+@react-three/drei, tw-animate-css |
| 6 | react-helmet-async, vite-plugin-prerender |
| 7 | vite-bundle-visualizer, lighthouse, vite-plugin-pwa, vite-imagetools, vite-plugin-compression, @playwright/test |

**Pre-built shared/ui (14):** Button, Card, Input, Modal, Badge, EmptyState, Icon, Select, Skeleton, Spinner, Textarea, Toast, Tooltip, index.ts

**shadcn/ui (50+):** accordion, alert, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, combobox, command, context-menu, dialog, drawer, dropdown-menu, field, hover-card, input, input-group, input-otp, kbd, label, menubar, native-select, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group, tooltip

---

## Architecture Rules

- Domain: pure TS, zero framework deps
- Application: hooks + use cases, depends only on domain
- Infrastructure: React + Tailwind + HTTP + Zustand, implements domain interfaces
- Shared: UI primitives, never imports from features
- `interface` for objects, `type` for unions
- Named exports, tests colocated (`Button.test.tsx`)
- No `any`

## Always Rules

- No lorem ipsum → ask for real content
- Interactive: 4 states (rest, hover, active, focus-visible)
- Data: 4 states (loading, empty, error, populated)
- Animation: prefers-reduced-motion fallback
- Escalation: CSS → GSAP → Motion → R3F
- GSAP: dynamic imports only (never static module level)
- R3F: `React.lazy()` only
- Every page: `<SEOHead>` + JSON-LD + canonical
- Static routes: prerender list. Dynamic: sitemap
- Deployment: `public/_redirects` + `vercel.json`
- Responsive: verify at 375px · 768px · 1280px · 1920px
- **Imágenes reales:** Unsplash (`<img src="https://images.unsplash.com/...">`) y Pexels (`<video>`). Lucide solo para UI icons. Si falta URL exacta, dejar `{/* TODO: [descripción] — descargar de [Unsplash/Pexels/Cliente] */}`.
