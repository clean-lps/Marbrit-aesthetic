# AGENTS.md — Designer Workflow

## Who I Am

I am a web designer who builds **super attractive, animated, impressive multi-page sites** from scratch. My stack: **React + Vite + TypeScript + Tailwind v4 + GSAP + Motion**. My clients expect unique, stunning UIs with complex interactions, fast load times, and real search engine visibility.

---

## Stack Rules

- **React 18+** with strict TypeScript (`strict: true` in tsconfig)
- **Tailwind v4** with `@theme` block in `src/index.css` — never hardcode hex values
- **Vite** as bundler
- **Feature-based Clean Architecture** with vertical slicing:

```
src/
├── features/{feature}/
│   ├── domain/          # Types, entities, interfaces (zero dependencies)
│   ├── application/     # Hooks, use cases, business logic
│   └── infrastructure/  # API adapters, stores (Zustand), React components
├── shared/
│   ├── ui/              # Primitives: Button, Card, Modal, Input, Badge
│   ├── lib/             # Helper utilities
│   ├── types/           # Global types
│   └── config/          # Constants, routes, seo
├── index.css            # @theme block
└── main.tsx
```

- **Dependency direction**: `infrastructure → application → domain` (never inward)
- Each feature is self-contained and extractable
- Pure visual components in `shared/ui/` — no business logic mixed in
- Hooks bridge UI and application layer
- **Responsive: mobile-first** — base styles = 375px, scale up with `sm:` `md:` `lg:` `xl:`
- **Breakpoints from `@theme` tokens only** — never arbitrary values like `min-width: 823px`
- **Every section verified at 375px · 768px · 1280px · 1920px** before moving to the next

---

## How to Use Skills

Skills are loaded automatically when relevant, or invoke them directly:

```
/skill-name instructions
```

## Skills Available

### Design Intelligence
- **`ui-ux-pro-max`** — 67 styles, 161 palettes, 57 font pairings. Generates design direction, color palettes, typography combinations
- **`modern-frontend-design`** — 2026 CSS features: OKLCH, `animation-timeline: view()`, `@starting-style`, View Transitions, Liquid Glass
- **`ui-craft`** — Rules-based design engineering presets (minimal, editorial, dense-dashboard). Use `/ui-craft:shape` for wireframe-first approach

### Generation
- **`add-ui`** — Generate 5 distinct UI directions for any section/component. Let the user choose one
- **`brief`** — Generate design brief from requirements
- **`setup`** — Scaffold project structure

### Composition & Layout
- **`arrange`** — Layout composition, grouping, spacing rhythm
- **`depth`** — Shadows, overlays, glassmorphism, layer system
- **`hierarchy`** — Priority, emphasis, action clarity
- **`normalize`** — Align existing UI back to design system
- **`extract`** — Pull repeated patterns into reusable components
- **`distill`** — Simplify cluttered surfaces

### Color & Typography
- **`colorize`** — Strategic color introduction (one accent, 3–5 placements)
- **`typeset`** — Typography refinement: scale, tracking, micro-typography
- **`imagery`** — Image and iconography guidance

### Animation & Motion
- **`animate`** — Add/fix motion: easing, duration, choreography
- **`micro-interactions`** — 20+ interaction patterns: buttons, toggles, forms, modals, skeletons, scroll reveals, spring physics
- **`delight`** — Add tasteful personality and memorable moments
- **`bolder`** — Increase visual confidence and impact
- **`quieter`** — Reduce visual intensity without losing hierarchy

### UX & Copy
- **`clarify`** — Improve copy: button labels, CTAs, error messages, empty states
- **`forms`** — Complex form design
- **`empty-state`** — Design empty states (icon + heading + CTA)
- **`onboard`** — Onboarding and first-time experience design
- **`search`** — Search and filter UI design
- **`security-ux`** — Authentication, passwords, 2FA, permissions UX
- **`localize`** — Multi-language and region adaptation

### Review & Polish
- **`critique`** — UX critique with scores and prioritized issues
- **`audit`** — Technical UI quality checks (accessibility, performance, semantics)
- **`polish`** — Final pass: alignment, consistency, micro-detail
- **`harden`** — Edge cases, boundary states, error scenarios
- **`test`** — Add tests for components

### Vercel Skills (pre-installed via setup.ps1)
- **`vercel-react-best-practices`** — 45 React performance rules: avoid cascading useEffect, waterfall requests, unnecessary renders. Auto-triggers on component generation/refactor
- **`vercel-composition-patterns`** — Compound components, render props, scalable composition patterns
- **`vercel-react-view-transitions`** — Native page transitions with View Transitions API
- **`vercel-optimize`** — Bundle optimization, lazy loading, Core Web Vitals
- **`web-design-guidelines`** — Web design standards for polished, consistent interfaces

### Data & Accessibility
- **`data-viz`** — Charts and data visualization
- **`adapt`** — Responsive and multi-device adaptation
- **`a11y`** — WCAG compliance: contrast, keyboard, ARIA, screen readers

---

## Documentation Flow (Mandatory)

| Phase | Document | What to write |
|---|---|---|
| 0 / 1 | `CLIENTE-BRIEF.md` | Client goals, brand, audience, sections, CTAs |
| 1.5 | `ARCHITECTURE.md` | Sitemap, layout strategy, navbar/footer structure, action map |
| 2 | `DESIGN.md` | `@theme` token tables (colors, fonts, radius, animations) |
| 3 | `DESIGN.md` + `ARCHITECTURE.md` | Component API, props interfaces, state management strategy |
| 4 | `ARCHITECTURE.md` | Route map, code splitting strategy, action map finalized, mini-workflows used |
| 5 | `ARCHITECTURE.md` | Animation stack decision tree, 3D usage decisions |
| 6 | `src/shared/config/seo.ts` + `public/robots.txt` + `scripts/sitemap.mjs` | Real project values, prerender route list |
| 7.5 | All three | Final review, complete with real values, bundle composition |

---

## Project Workflow

Execute phases in order. **Always confirm with the user before moving to the next phase.**

---

### Phase 0 — Project Setup

Check if `package.json` exists. If not:
1. Copy the template: `cp -r ../template/* .` (adjust path per project)
2. Edit `package.json` → name, version
3. Edit `index.html` → title, meta tags, favicon, theme-color
4. Run `powershell -File setup.ps1` to install dependencies
5. Create `CLIENTE-BRIEF.md` if it doesn't exist

**Environment variables — always on every project:**
```bash
# Create .env.example (commit this)
VITE_API_URL=https://api.yoursite.com
VITE_SITE_URL=https://yoursite.com

# Create .env.local (never commit — add to .gitignore)
VITE_API_URL=http://localhost:3000
VITE_SITE_URL=http://localhost:5173
```
- All Vite env vars must use the `VITE_` prefix to be accessible in the browser
- Access with `import.meta.env.VITE_API_URL`
- Never hardcode URLs, API endpoints, or keys — always from env

**Deployment config — add before first commit:**
```
# public/_redirects  (Netlify / Cloudflare Pages)
/*  /index.html  200

# vercel.json  (Vercel)
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
Without this, any direct URL access to `/blog/article` or `/pricing` returns 404 in production. Add both files — they don't interfere with each other.

**Path aliases — verify `tsconfig.json` and `vite.config.ts`:**
```json
// tsconfig.json
{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
```
```ts
// vite.config.ts
import { resolve } from "path"
resolve: { alias: { "@": resolve(__dirname, "./src") } }
```
The template has this configured — verify before writing any `@/` import.

---

### Phase 1 — Client Grill

Ask questions **one at a time**. Wait for the answer before the next.

1. **"¿Cuál es el nombre del proyecto o marca?"**
   > Averiguar el nombre oficial que usaremos en logo, dominio, títulos SEO.

2. **"¿En qué industria opera?"**
   > Entender el rubro: fintech, lujo, SaaS, ecommerce, salud, educación, turismo, inmobiliaria, etc. Esto define el tono general y las expectativas visuales.

3. **"¿Quién es la audiencia objetivo?"**
   > Edad aproximada, perfil (profesionales, familias, jóvenes, ejecutivos), dispositivo principal (móvil, desktop, ambos). Esto define decisiones de diseño y prioridades responsive.

4. **"¿Es un sitio web actual que quieres mejorar o rediseñar?"**
   > Si la respuesta es sí: "Pásame la URL para analizarlo y conservar lo que funciona (contenido, estructura, SEO)." Si es no, pasamos.

5. **"¿Tienes una URL de referencia de estilo?"**
   > Un sitio que admires visualmente para inspirarme. Puede ser de tu industria o no. Si no tienes, pasamos a la siguiente.

6. **"¿Tienen referencias visuales adicionales? ¿Marcas que admiran?"**
   > Instagram, Pinterest, Behance, competencia directa. Cualquier referencia visual ayuda a entender el gusto del cliente.

7. **"¿Qué tono o vibe quieren?"**
   > Opciones concretas para elegir:
   > - **Lujoso/oscuro** — Elegante, premium, fondos oscuros, tipografía serif, dorados
   > - **Minimal/editorial** — Blanco, mucho espacio, tipografía limpia, fotos grandes
   > - **Playful/colorido** — Divertido, colores vivos, ilustraciones, animaciones
   > - **Técnico/preciso** — Sobrio, datos, gráficos, tipografía mono, sans-serif
   > - **Orgánico/natural** — Tonos tierra, formas curvas, texturas, fotografía natural
   > - **Brutalista** — Tipografía grande y bold, colores planos, grids rotos, raw

8. **"¿Colores o tipografías existentes, o prefieres que proponga desde cero?"**
   > Si ya tienen marca: pedir manual de marca, hex colors, logos. Si no: proponeré una paleta coherente con el vibe que eligieron.

9a. **"¿Qué secciones necesita la página de inicio?"**
    > Preguntar una por una: Hero, features, servicios, pricing, testimonios, FAQ, CTA final, footer, etc. Anotar todas. Preguntar también el orden aproximado.

9b. **"¿Qué páginas adicionales necesita el sitio completo?"**
    > Piensa en el navbar y el footer: About, Blog, Contact, Pricing, Login, Dashboard, Careers, Galería, etc. Cada página será una ruta independiente con react-router-dom.

10. **"¿Funcionalidades especiales?"**
    > Animaciones, carruseles de imágenes, filtros de búsqueda, dashboards con gráficos, elementos 3D, chat AI, formularios multi-paso, integración con APIs, autenticación, panel de admin. Preguntar si hay integraciones específicas (WhatsApp, Stripe, Maps, etc.).

11. **"Cada botón o enlace de la página: ¿a dónde debe llevar o qué debe hacer?"**
    > Recorrer cada elemento interactivo:
    > - Botón "Saber más" → ¿scroll a sección? ¿página interna? ¿modal?
    > - "Empezar" → ¿/register? ¿/pricing? ¿abrir WhatsApp?
    > - "Ver demo" → ¿modal con video? ¿nueva pestaña? ¿YouTube embed?
    > - Logo → ¿siempre a home?
    > - Redes sociales → ¿links externos? ¿ventana nueva?
    > - Formulario de contacto → ¿enviar a email? ¿CRUD? ¿webhook?

Save everything to `CLIENTE-BRIEF.md`.

**Presentar resumen al cliente:**
Antes de seguir, presenta un resumen con todo lo recopilado en esta fase: nombre del proyecto, industria, audiencia, referencias, tono/vibe, colores/tipografías, secciones de inicio, páginas adicionales, funcionalidades especiales.

Explica **tu interpretación** de lo que entendiste, como por ejemplo: *"Según lo que me contaste, sería un sitio de X páginas con tal estética y tales funcionalidades"*. Esto permite que el cliente confirme o corrija antes de invertir tiempo en diseño.

Espera la confirmación del cliente antes de continuar.

After collecting info, use `/ui-ux-pro-max` to suggest style direction, palette, and font pairings. Present 2–3 options.

---

### Phase 1.5 — Navigation Architecture

Before any design tokens or components — define the complete skeleton. **Planning only, no component code yet.**

**Step 1 — Sitemap + Layout Strategy**

Define routes AND which layout wraps each group:

```
Root Layout (Navbar global + Footer global)
├── /              → Home
├── /about         → About
├── /pricing       → Pricing
├── /contact       → Contact
├── /legal/privacy → Privacy (noindex)
├── /legal/cookies → Cookies (noindex)
│
Blog Layout (Navbar global + Blog sidebar/breadcrumb)
├── /blog          → Blog index
└── /blog/:slug    → Blog article
│
Dashboard Layout (Sidebar + topbar, NO global footer)
├── /dashboard          → Dashboard home (noindex)
└── /dashboard/settings → Settings (noindex)
│
Auth Layout (minimal, no Navbar/Footer)
└── /login         → Login (noindex)
```

Nested layouts use React Router's nested `<Outlet />`:
```tsx
// Root route wraps everything
<Route element={<RootLayout />}>
  <Route path="/" element={<HomePage />} />
  <Route element={<BlogLayout />}>
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:slug" element={<BlogArticlePage />} />
  </Route>
  <Route element={<DashboardLayout />}>
    <Route path="/dashboard" element={<DashboardPage />} />
  </Route>
</Route>
<Route element={<AuthLayout />}>
  <Route path="/login" element={<LoginPage />} />
</Route>
```

Create `src/shared/config/routes.ts`:
```ts
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  BLOG: "/blog",
  BLOG_ARTICLE: "/blog/:slug",
  PRICING: "/pricing",
  CONTACT: "/contact",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
} as const
```

**Step 2 — Navbar Definition** (data only, no JSX yet)
```ts
interface NavLink { label: string; href: string; isCTA?: boolean }
const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Get Started", href: "/register", isCTA: true },
]
// Mobile: hamburger + full-screen drawer
// Sticky: yes — backdrop-blur on scroll
```

**Step 3 — Footer Definition** (data only, no JSX yet)
```ts
interface FooterColumn { heading: string; links: { label: string; href: string }[] }
const FOOTER_COLUMNS: FooterColumn[] = [
  { heading: "Product", links: [{ label: "Features", href: "/#features" }, ...] },
  { heading: "Company", links: [{ label: "About", href: "/about" }, ...] },
  { heading: "Legal", links: [{ label: "Privacy", href: "/legal/privacy" }, ...] },
]
```

**Step 4 — Action Mapping**
```
Hero:     "Get Started" → /register | "Watch Demo" → modal | "Learn More" → scroll #features
Pricing:  "Start Free"  → /register?plan=free | "Contact Sales" → /contact
Blog:     Card click    → /blog/[slug]
Nav CTA:  "Get Started" → /register
```

**Write `ARCHITECTURE.md`** with layout strategy, routes, navbar, footer, and action map.
**Append "Arquitectura de Navegación" to `CLIENTE-BRIEF.md`.**

**Revisión:** Presenta al cliente el esquema de navegación (rutas, layouts, navbar, footer, action map). Espera confirmación antes de diseñar.

---

### Phase 2 — Design System

**Build Navbar + Footer NOW** using structure from Phase 1.5.

> ⚠️ `shared/ui` components (Button, Card, etc.) don't exist yet — they're Phase 3.
> Build Navbar and Footer with **Tailwind + `@theme` tokens** (defined below). No `<Button>` imports.
> After Phase 3, refactor them to use shared/ui primitives.

```tsx
// Navbar — Tailwind + @theme tokens, no shared/ui yet
<nav className="sticky top-0 z-50 backdrop-blur-md border-b border-[--color-border] ...">
  <a href="/" className="text-[--color-primary] font-bold ...">Logo</a>
  <div className="...">
    {NAV_LINKS.map(link => (
      <Link key={link.label} to={link.href} className={link.isCTA ? "bg-[--color-primary] text-[--color-primary-foreground] ..." : "text-[--color-muted-foreground] hover:text-[--color-foreground] ..."}>
        {link.label}
      </Link>
    ))}
  </div>
</nav>
```

Wire up the nested layout structure defined in Phase 1.5:
```tsx
// App.tsx
<BrowserRouter>
  <ScrollRestoration />  {/* ← restores scroll position on back/forward */}
  <Routes>
    <Route element={<RootLayout />}>     {/* Navbar + Footer */}
      <Route path="/" element={<HomePage />} />
      ...
    </Route>
    <Route element={<AuthLayout />}>     {/* Minimal layout */}
      <Route path="/login" element={<LoginPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

Then generate `src/index.css` with `@theme` block:
- **OKLCH** color format (via `/modern-frontend-design`)
- Define: `--color-*`, `--font-*`, `--radius-*`, `--animate-*`
- Zero hardcoded hex values — everything from tokens
- Base on `CLIENTE-BRIEF.md` brand colors

Run `/colorize` to validate palette. Run `/typeset` for typography refinement.
**Test:** Verify contrast ratios (WCAG AA) for all color pairings. Confirm `@theme` tokens produce expected values in dev tools.
**Populate `DESIGN.md`** with the complete token tables.

**Revisión:** Muestra al cliente el Navbar, Footer, y los tokens de diseño (colores, tipografías). Espera confirmación antes de construir componentes.

---

### Phase 3 — Component Architecture

Build the shared component library:

```
shared/ui/
├── Button.tsx        → 4 states: hover, active, focus-visible, disabled
├── Card.tsx          → with skeleton loader
├── Input.tsx         → with error/success states
├── Modal.tsx         → with focus trap + @starting-style animation
├── Badge.tsx
├── EmptyState.tsx    → icon + heading + CTA
└── index.ts          → re-exports
```

Rules:
- Strict TypeScript — props exported as `interface ComponentNameProps` (not `React.FC`)
- All states defined: loading, empty, error, disabled
- Smooth transitions (150ms default)
- Use `/ui-craft:shape` for wireframe-first on complex components
- Use `/extract` when repeated patterns appear

**After building shared/ui — verify each component renders all its states** (loading, empty, error, disabled) before marking it done.
**Then refactor Navbar and Footer** to use `<Button>` and other primitives.

**Error boundaries — add one per layout:**
```tsx
import { ErrorBoundary } from "react-error-boundary"

function RootLayout() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Navbar />
      <Outlet />
      <Footer />
    </ErrorBoundary>
  )
}
```

**Update `DESIGN.md`** with Component API. **Update `ARCHITECTURE.md`** with component hierarchy and state management strategy.

**Revisión:** Muestra al cliente los componentes construidos y cómo se verán integrados. Espera confirmación antes de construir páginas.

---

### Phase 4 — Build Sections & Pages

**Route-level code splitting — always, for every page:**
```tsx
// src/shared/config/lazyRoutes.ts
import { lazy } from "react"

export const HomePage         = lazy(() => import("@/features/home/infrastructure/HomePage"))
export const BlogPage         = lazy(() => import("@/features/blog/infrastructure/BlogPage"))
export const BlogArticlePage  = lazy(() => import("@/features/blog/infrastructure/BlogArticlePage"))
export const PricingPage      = lazy(() => import("@/features/pricing/infrastructure/PricingPage"))
export const ContactPage      = lazy(() => import("@/features/contact/infrastructure/ContactPage"))
export const LoginPage        = lazy(() => import("@/features/auth/infrastructure/LoginPage"))
export const DashboardPage    = lazy(() => import("@/features/dashboard/infrastructure/DashboardPage"))

// Wrap routes in Suspense
<Suspense fallback={<PageLoader />}>
  <Routes>...</Routes>
</Suspense>
```
This keeps the critical bundle under 200KB regardless of how many pages the site has.

**Scroll restoration — already wired in Phase 2:**
```tsx
import { ScrollRestoration } from "react-router-dom"
// <ScrollRestoration /> in root layout restores scroll on back/forward navigation
```

**Before building any section — verify the action map from Phase 1.5 is complete.**

For each section:
1. `/add-ui` → generate 5 distinct UI directions
2. Present to user, wait for choice
3. Build chosen direction: full layout, all states, responsive, all CTAs wired
4. Only `@theme` tokens — never hardcode values

**Mini-workflows by section type:**

**Routing** (`react-router-dom`):
```tsx
import { Link, useNavigate } from "react-router-dom"
// <Link to={ROUTES.PRICING}>Pricing</Link>
// const navigate = useNavigate(); navigate(ROUTES.REGISTER)
```

**Forms** (`react-hook-form` + `zod`):
```tsx
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
const schema = z.object({ email: z.string().email() })
const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })
// Always show errors.field?.message next to each input
```

**Charts** (`recharts`):
```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
// Always wrap in <ResponsiveContainer width="100%" height={300}>
```

**Carousels** (`embla-carousel-react` for native, `swiper` for touch):
```tsx
// Embla: useEmblaCarousel({ loop: true })
// Swiper: <Swiper loop grabCursor><SwiperSlide /></Swiper>
```

**Dark mode** (`next-themes`):
```tsx
// Wrap app with <ThemeProvider attribute="class" defaultTheme="system">
// useTheme() → { theme, setTheme }
```

**API calls** (`axios` with interceptors):
```tsx
// src/shared/lib/api.ts
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })
api.interceptors.response.use(
  res => res,
  err => { /* handle 401, 403, 500 globally */ return Promise.reject(err) }
)
export default api
```

**AI Chat** (`ai` + `@ai-sdk/react`):
Pre-built at `src/features/ai/` with `useChat()` hook and `ChatWindow` component.

**Test each section at 375px, 768px, 1280px, 1920px** — verify layout, CTAs, and no overflow before moving to next section.
**Update `ARCHITECTURE.md`** with finalized route map, code splitting strategy, and mini-workflows used.

**Revisión:** Muestra al cliente el avance de páginas construidas, confirma que cada sección cumple el action map y se ve bien en responsive. Espera confirmación antes de animar.

---

### Phase 5 — Animations, Motion & 3D

> The full animation stack comes pre-installed in the template:
> `gsap` · `motion` · `three` · `@react-three/fiber` · `@react-three/drei` · `lenis`

---

#### Lenis — Smooth Scroll (always first)

```tsx
// src/shared/lib/SmoothScrollProvider.tsx
import { ReactLenis } from "lenis/react"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
```

Connect to GSAP ticker (SmoothScrollProvider in the template already does this):
```tsx
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

Rules:
- Initialize Lenis before any ScrollTrigger instance
- `lenis.stop()` / `lenis.start()` when modals open/close
- Disable for `prefers-reduced-motion`

---

#### CSS Scroll-driven Animations (CSS first, always)

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal {
  animation: fadeUp linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
.progress-bar {
  animation: grow linear;
  animation-timeline: scroll(root);
  transform-origin: left;
}
@keyframes grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
```

**Decision rule:**
- Simple reveal, fade, slide, scale → **CSS `animation-timeline`**
- Parallax, pinning, scrub, choreography → **GSAP ScrollTrigger**
- Page transitions → **View Transitions API** first, Motion second

---

#### GSAP — Cinematic animations

> ⚠️ Never import GSAP statically at module level — it enters the critical bundle.

```tsx
// ✅ Always dynamic import inside useEffect
useEffect(() => {
  async function init() {
    const [{ default: gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/SplitText"),
    ])
    gsap.registerPlugin(ScrollTrigger, SplitText)
    // use gsap here
  }
  init()
}, [])
```

The template's `SmoothScrollProvider` already implements this pattern — don't modify it.

GSAP is for:
- `gsap.timeline()` for sequenced/scripted animations
- `ScrollTrigger` for parallax, pinning, scrubbing
- `SplitText` for character/word-level text reveals
- SVG morphing and motion path animations

---

#### Motion (Framer Motion) — React-native UI animations

- `motion.div` with spring physics
- `AnimatePresence` for exit animations and layout transitions
- Gesture animations: drag, hover, tap, pan
- Layout animations with `layout` prop
- Page transitions: `AnimatePresence` at router level

---

#### View Transitions API + Shared Element Transitions

**Page transitions** (use before any JS solution):
```tsx
document.startViewTransition(() => { /* navigate */ })
```
```css
::view-transition-old(root) { animation: slideOut 0.3s ease-in; }
::view-transition-new(root) { animation: slideIn 0.3s ease-out; }
```

**Shared element transitions** — the key to impressive multi-page navigation:
```css
/* Blog list page — each card gets a unique name */
.blog-card[data-id="42"] { view-transition-name: blog-42; }

/* Blog article page — hero gets the SAME name */
.blog-hero[data-id="42"] { view-transition-name: blog-42; }
```
When navigating from `/blog` to `/blog/42`, the card morphs into the hero image. This is what makes multi-page sites feel like native apps.

Use Motion's `AnimatePresence` only when View Transitions API isn't enough (complex choreography across React trees).

---

#### React Three Fiber — 3D elements

```tsx
// Always lazy load — never in critical bundle
const HeroScene = React.lazy(() => import("./HeroScene"))

<Suspense fallback={<Skeleton className="h-screen w-full" />}>
  <HeroScene />
</Suspense>

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <YourMesh />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
```

Rules:
- Always lazy load — never block first paint
- `useFrame` over `setInterval` for animation loops
- Dispose geometries and materials on unmount
- Simple CSS 3D effect → `transform: perspective()`, not R3F

When to use: hero backgrounds, product showcases, particle systems, geometric accents.

---

#### Hero Entrance Animations

```tsx
useLayoutEffect(() => {
  async function init() {
    const [{ default: gsap }, { SplitText }] = await Promise.all([
      import("gsap"),
      import("gsap/SplitText"),
    ])
    gsap.registerPlugin(SplitText)

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
    const split = new SplitText(".hero-title", { type: "chars" })

    tl.from(split.chars, { y: 80, opacity: 0, stagger: 0.03, duration: 0.8 })
      .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(".hero-cta", { y: 20, opacity: 0, stagger: 0.15, duration: 0.5 }, "-=0.2")
      .from(".hero-badge", { scale: 0.8, opacity: 0, duration: 0.4 }, "-=0.1")

    return () => split.revert()
  }
  init()
}, [])
```

Rules:
- `useLayoutEffect` (not `useEffect`) to prevent content flash
- Total sequence < 1.5s
- R3F scene renders before text starts — use `<Suspense>` + loader
- `prefers-reduced-motion`: skip all, show everything immediately
- `opacity: 0` in CSS initially to prevent flash if JS is slow

---

#### Micro-interactions (via `/micro-interactions`)

- Form fields: animated validation with Motion spring
- Skeleton loaders: GSAP repeating timeline
- Toast notifications: Motion AnimatePresence with spring exits
- Custom cursor: CSS + Motion for agency-level polish

---

#### Performance Patterns

**Radix UI — namespace imports only:**
```tsx
// ❌ barrel (bloats bundle)
import { Accordion } from "radix-ui"
// ✅ individual package
import * as AccordionPrimitive from "@radix-ui/react-accordion"
```

**R3F — always lazy:**
```tsx
// ❌ static import
import { Canvas } from "@react-three/fiber"
// ✅ lazy component
const HeroScene = React.lazy(() => import("./HeroScene"))
```

**Code splitting verification:**
```bash
npm run analyze    # vite-bundle-visualizer
npm run lighthouse # performance audit
```

---

#### Animation Rules — Always

- `@media (prefers-reduced-motion: reduce)` on every animation
- `transform` and `opacity` only — never animate width/height/top/left
- `will-change: transform` only while animating, remove after
- **Escalation:** CSS scroll-driven → GSAP → Motion → R3F

**Test:** Verify animations degrade gracefully under `prefers-reduced-motion`. Confirm no layout shift from animated elements (width/height never animated, only transform/opacity).
**Update `ARCHITECTURE.md`** with animation stack decisions.

**Revisión:** Muestra al cliente un video/grabación del sitio con las animaciones funcionando. Explica qué se anima con CSS, GSAP, Motion y R3F. Espera confirmación antes de pasar a SEO.

---

### Phase 6 — SEO & Accessibility

> ⚠️ **Critical context:** This is a Vite + React SPA (client-side rendering). Meta tags set by `react-helmet-async` require JavaScript to execute. Google indexes JS but with a delay of days to weeks (second wave indexing). To get fast, reliable indexing on static routes, prerendering is mandatory.

#### 6.1 Prerendering — Fix the CSR SEO Problem

Add `vite-plugin-prerender` to generate static HTML for all known routes at build time:

```bash
npm install vite-plugin-prerender --save-dev
```

```ts
// vite.config.ts
import prerender from "vite-plugin-prerender"

export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: resolve(__dirname, "dist"),
      routes: [
        "/", "/about", "/pricing", "/contact", "/blog",
        "/legal/privacy", "/legal/cookies",
        // dynamic routes like /blog/:slug need to be listed explicitly
        // or generated from a data source at build time
      ],
    }),
  ],
})
```

**Static routes** (/, /about, /pricing, etc.) → prerender all of them. Google gets HTML immediately.

**Dynamic routes** (/blog/:slug, /product/:id) → two options:
- **Option A (recommended):** Fetch all slugs at build time and add them to the routes array
- **Option B:** Accept second-wave indexing delay. Ensure sitemap.xml lists these URLs so Google discovers them fast.

Update `scripts/sitemap.mjs` and `scripts/prerender-routes.mjs` with the real route list.

#### 6.2 Fill in real project values

```
src/shared/config/seo.ts   → SITE_NAME, BASE_URL, DEFAULT_OG_IMAGE
public/robots.txt          → replace https://example.com with real domain
scripts/sitemap.mjs        → update ROUTES array and SITE_URL
```

#### 6.3 SEOHead — meta tags per page

```tsx
// main.tsx — wrap once
import { HelmetProvider } from "react-helmet-async"
<HelmetProvider><BrowserRouter><App /></BrowserRouter></HelmetProvider>

// Every page
import { SEOHead } from "@/shared/lib/SEOHead"

<SEOHead
  title="Page Title | Site Name"
  description="1–2 sentences, max 160 chars, main keyword included."
  canonical={`${import.meta.env.VITE_SITE_URL}/page`}
  ogImage="https://yoursite.com/images/og.jpg"
  ogType="website"
  twitterCard="summary_large_image"
/>
```

Rules:
- Every route needs `<SEOHead>` with unique title + description + canonical
- Title: "Page Title | Site Name" (max 60 chars)
- `ogImage` minimum 1200×630px — test at https://cards-dev.twitter.com/validator and https://developers.facebook.com/tools/debug/
- `noindex={true}` on login, dashboard, admin, post-form thank-you pages
- Dynamic routes: fetch article/product data first, then set meta tags from that data

**Twitter/X Cards — add to SEOHead:**
```tsx
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
```

#### 6.4 JSON-LD Structured Data

| Type | Helper | When |
|---|---|---|
| Article | `articleJsonLd()` | Blog posts, news, guides |
| Organization | `organizationJsonLd()` | Homepage, About, Footer |
| FAQPage | `faqJsonLd()` | FAQ sections |
| BreadcrumbList | `breadcrumbJsonLd()` | Every inner page |
| Product | `productJsonLd()` | Product/pricing pages |

Validate at https://search.google.com/test/rich-results before publishing.

#### 6.5 Sitemap & robots.txt

```bash
npm run build  # generates dist/sitemap.xml + prerenders static routes
```

Update `scripts/sitemap.mjs` every time a new route is added.
`robots.txt`: disallow `/login`, `/dashboard`, `/admin`. Point to sitemap.

#### 6.6 Core Web Vitals as SEO Ranking Factor

Google uses LCP, CLS, and INP as ranking signals. Bad performance = lower ranking, regardless of meta tags.

- **LCP** (Largest Contentful Paint < 2.5s) — preload above-fold images: `<link rel="preload" as="image" href="/hero.webp">`
- **CLS** (Cumulative Layout Shift < 0.1) — always set `width`/`height` on images, reserve space for dynamic content
- **INP** (Interaction to Next Paint < 200ms) — avoid heavy work on main thread during interactions

#### 6.7 SEO Pre-deploy Checklist

- [ ] Static routes are in `vite-plugin-prerender` routes array
- [ ] Dynamic routes are in `sitemap.xml`
- [ ] Every page has `<SEOHead>` with unique title + description + canonical
- [ ] Every page has correct JSON-LD type
- [ ] Titles < 60 chars, descriptions < 160 chars
- [ ] Twitter Card + og:image tested with social debuggers
- [ ] Images: descriptive `alt` text, proper `width`/`height`, WebP format
- [ ] Single `h1` per page, hierarchy `h1 → h2 → h3`
- [ ] Login/dashboard/admin pages have `noindex`
- [ ] Internal links use `<Link>` from react-router (not bare `<a>`)
- [ ] `npm run lighthouse` SEO score ≥ 90, performance ≥ 80
- [ ] Validate with Google Rich Results Test

#### 6.8 Accessibility

- `/a11y` — contrast, keyboard nav, ARIA, screen readers
- `/critique` — UX review with scored findings
- Ensure: skip link, focus-visible, labels, alt text, heading hierarchy

**Revisión:** Confirma con el cliente que los meta tags, JSON-LD y sitemap están configurados. Verifica que pages como login/dashboard tengan noindex. Espera confirmación antes del quality gate.

---

### Phase 7 — Quality Gate

**Functionality:**
1. `/audit` — technical UI quality check
2. `/polish` — alignment, consistency, micro-detail
3. `/harden` — edge cases review
4. `/delight` — personality moments
5. `npm run build` — zero warnings, prerender completes without errors
6. `npx tsc --noEmit` — zero type errors

**Performance:**
7. `npm run analyze` — verify chunk separation (gsap, three, r3f, motion in separate chunks)
8. GSAP uses dynamic imports everywhere — no static `import { gsap }` at module level
9. R3F uses `React.lazy()` everywhere — no static canvas imports
10. No `import { X } from "radix-ui"` barrel — only `import * as X from "@radix-ui/react-X"`
11. `will-change` removed after animations complete
12. Images: WebP, `width`/`height` set, `loading="lazy"` below fold
13. Above-fold hero image: `<link rel="preload" as="image">` in `index.html`
14. `npm run lighthouse` — LCP < 2.5s · CLS < 0.1 · INP < 200ms · SEO ≥ 90

**Final summary to user:**
- Pages and sections built
- Design tokens used
- Animation breakdown (CSS / GSAP / Motion / R3F)
- Prerendered routes list
- Bundle size report
- Lighthouse scores

---

### Phase 7.5 — Documentation Outputs

`DESIGN.md`, `ARCHITECTURE.md`, and `CLIENTE-BRIEF.md` exist in the template. This phase fills every section with real values.

**`DESIGN.md`:**
- Complete `@theme` token tables
- Component API: props, variants, all states
- Usage examples in Tailwind classes and CSS `var()`
- Do's and don'ts

**`ARCHITECTURE.md`:**
- Folder structure with Clean Architecture layers
- Layout strategy (root, blog, dashboard, auth layouts)
- Route map with code splitting (which lazy component per route)
- Component hierarchy
- State management strategy
- Animation stack decision tree (CSS → GSAP → Motion → R3F)
- Final bundle composition and chunk sizes

**`CLIENTE-BRIEF.md`:** update if anything changed.

---

## Toolbox — Full Dependency Map

| Dependency | Phase | Purpose |
|---|---|---|
| `react` / `react-dom` | 0 | Base |
| `typescript` | 0 | Strict mode, path aliases |
| `tailwindcss` / `@tailwindcss/vite` | 0, 2 | Utility CSS + `@theme` tokens |
| `@fontsource-variable/geist` | 2 | Geist Variable font |
| `cva` / `clsx` / `tailwind-merge` | 3 | `cn()` utility + variants |
| `@radix-ui/*` (27 packages) | 3 | Headless primitives — namespace imports only |
| `@base-ui/react` | 3 | Additional headless primitives |
| `lucide-react` | 3 | Icons |
| `sonner` | 3 | Toast notifications |
| `vaul` | 3 | Drawer component |
| `next-themes` | 2 | Dark mode |
| `zustand` | 3 | Global state stores |
| `react-error-boundary` | 3 | Error boundaries per layout |
| `react-router-dom` | 4 | Routing, nested layouts, ScrollRestoration |
| `react-hook-form` + `zod` + `@hookform/resolvers` | 4 | Forms with validation |
| `recharts` | 4 | Charts / data viz |
| `embla-carousel-react` | 4 | Native carousels |
| `swiper` | 4 | Touch sliders |
| `cmdk` | 4 | Command palette / search |
| `input-otp` | 4 | OTP / 2FA input |
| `react-day-picker` | 4 | Date pickers |
| `react-resizable-panels` | 4 | Resizable panels (dashboards) |
| `date-fns` | 4 | Date formatting |
| `axios` | 4 | HTTP API calls with interceptors |
| `ai` + `@ai-sdk/react` | 4 | AI chat feature (pre-built) |
| `@ridemountainpig/svgl-react` | 4 | SVG brand icon library |
| `gsap` + `@gsap/react` | 5 | Cinematic animations — dynamic imports only |
| `motion` | 5 | React spring animations, AnimatePresence, gestures |
| `lenis` (includes `lenis/react`) | 5 | Smooth scroll + GSAP integration |
| `three` + `@react-three/fiber` + `@react-three/drei` | 5 | 3D / WebGL — lazy load only |
| `tw-animate-css` | 5 | CSS animation utilities |
| `react-helmet-async` | 6 | SEO meta tags + Twitter Cards per page |
| `vite-plugin-prerender` | 6 | Static HTML generation for known routes — fixes CSR SEO |
| `vite-bundle-visualizer` | 7 | Bundle analysis (`npm run analyze`) |
| `lighthouse` | 7 | Performance audits (`npm run lighthouse`) |
| `vite-plugin-pwa` | 7 | Service Worker + offline + manifest |
| `vite-imagetools` | 7 | Auto image optimization (WebP/AVIF) |
| `vite-plugin-compression` | 7 | Brotli compression on build |
| `@biomejs/biome` | 0 | Lint + format (`npm run check` / `npm run ci`) |
| `@playwright/test` | 7 | E2E visual testing (`npm run test:e2e`) |
| `vitest` + `@testing-library/*` | 3 | Unit tests (`npm run test`) |

**Pre-built `shared/ui` components (14):** Button · Card · Input · Modal · Badge · EmptyState · Icon · Select · Skeleton · Spinner · Textarea · Toast · Tooltip · index.ts

**Pre-installed shadcn/ui components (50+):** accordion · alert · avatar · badge · breadcrumb · button · calendar · card · carousel · chart · checkbox · collapsible · combobox · command · context-menu · dialog · drawer · dropdown-menu · field · hover-card · input · input-group · input-otp · kbd · label · menubar · native-select · navigation-menu · pagination · popover · progress · radio-group · resizable · scroll-area · select · separator · sheet · sidebar · skeleton · slider · sonner · spinner · switch · table · tabs · textarea · toggle · toggle-group · tooltip

---

## Architecture Rules

### Clean Architecture

1. **Domain** (`features/{feature}/domain/`) — pure TypeScript, zero framework dependencies
2. **Application** (`features/{feature}/application/`) — hooks, use cases; depends only on domain
3. **Infrastructure** (`features/{feature}/infrastructure/`) — React, Tailwind, HTTP, Zustand; implements domain interfaces
4. **Shared** (`shared/`) — UI primitives and utilities; never imports from any feature

### Code Style
- `interface` for object shapes, `type` for unions
- Props typed as `interface ComponentNameProps` — function components with explicit typed props (not `React.FC`)
- Named exports over default exports
- Tests colocated: `Button.test.tsx` next to `Button.tsx`
- No `any` — create a proper type instead

---

## Rules — Always

- Never write placeholder or lorem ipsum — ask for real content
- Every interactive element: 4 states (rest, hover, active, focus-visible)
- Every data display: 4 states (loading, empty, error, populated)
- Every animation: `prefers-reduced-motion` fallback
- Design tokens first → components second → pages last
- Animation escalation: CSS scroll-driven → GSAP → Motion → R3F
- GSAP: dynamic imports only, never static at module level
- R3F: `React.lazy()` only, never static imports
- Every page: `<SEOHead>` + JSON-LD + canonical
- Static routes: in prerender list. Dynamic routes: in sitemap
- Deployment: `public/_redirects` and `vercel.json` present in every project
- Responsive: every section verified at 375px · 768px · 1280px · 1920px
- **Imágenes reales bajo demanda** — por defecto usa `<img src="https://images.unsplash.com/...">` (Unsplash) y `<video src="https://videos.pexels.com/...">` (Pexels). El diseño lo exige, así que usa fotos reales siempre que sea posible. Iconos SVG de Lucide solo para UI (iconos de botones, decorativos). Si no tienes la URL exacta, deja el `<img>` o `<video>` con dimensiones y un `{/* TODO: [descripción] — descargar de [Unsplash/Pexels/Cliente] */}`.
- **APIs externas primero** — cuando una feature requiera datos externos, scraping, integración con terceros, o funcionalidades como búsqueda SEO, precios, reviews, redes sociales, lead generation, etc., consultar `APIS.md` antes de implementar soluciones custom. Usar APIs existentes siempre que sea posible.
