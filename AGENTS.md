# AGENTS - Premium Landing / Marketing Sites

## Mission

Build React + Tailwind marketing sites that feel made for one specific brand.

The site must have:
- an impressive first viewport
- real visual subject matter
- sections that do not look reusable across brands
- clear brand soul: audience, tone, category, proof, and visual memory
- complete client info, page map, SEO, CTAs, and deployment basics

If the result could be used for another brand by changing only the logo, it failed.

## Stack Defaults

React 18+ | TypeScript strict | Tailwind v4 | Vite

Use extra libraries only when they clearly earn their place:
- `motion` for stateful UI animation and page/section entrances
- `gsap` for advanced hero, scroll, split text, pinning, or parallax
- `lenis` only when smooth scroll is part of the creative direction
- `three` / R3F only when 3D is central to the brand idea
- `embla-carousel-react` only for real galleries, case studies, or testimonial rails
- `react-hook-form` + `zod` only for real forms
- `react-helmet-async` for SEO metadata

No dependency for something CSS, HTML, or a few lines of React can do.

## Inspiration Tools

Use references as ingredients, never as a template.

| Tool | Use it for | Output |
|---|---|---|
| Mobbin | Real flows, UX patterns, auth, onboarding, checkout, pricing, mobile behavior | UX notes in `CLIENTE-BRIEF.md` |
| Land-book | Landing structure, section rhythm, typography, art direction | 3 structural references |
| Recent.design | Fresh visual trends and modern layout ideas | 2 visual references |
| React Bits | Animated React components and hero/detail interactions | Candidate components list |
| Uiverse | Small UI details: buttons, loaders, toggles, hovers | Micro-interaction ideas |
| MotionSites | Motion pacing, hero reveals, scroll ideas | Motion direction |
| DesignSpells | Creative visual tricks and interaction inspiration | Polish ideas |
| Portfolio Ideas | Portfolio/case-study layout patterns | Portfolio section ideas |
| Toolfolio | Discover new tools when a specific need appears | Optional tool note |
| Magic UI | Open-source React/Tailwind/Motion animated components | Copy/adapt component source |
| Aceternity UI | Landing sections, bento grids, hero effects, motion blocks | Copy/adapt component source |
| 21st.dev | Searchable React components/templates, MCP where available | Component shortlist |
| Shadcnblocks | Shadcn/Tailwind blocks, pages, templates, CLI/MCP workflows | Install or copy block |
| v0 / Figma Make / Framer / Lovable | Fast ideation or alternate drafts | Reference only unless user asks to use them |

## Tool Access Modes

Use the strongest access available, in this order:

1. Direct public browsing: use public URLs from Land-book, Recent, React Bits, Uiverse, MotionSites, DesignSpells, Portfolio Ideas, and public competitor sites.
2. Logged-in browser access: for Mobbin or other paid/login tools, the user opens/logs in through the browser connector and the agent inspects visible pages/screens.
3. User-provided reference pack: if direct access is blocked, ask for 3-8 links, screenshots, exports, or a short screen recording.
4. Known-pattern fallback: if no access is available, use category knowledge and clearly label assumptions.

Never pretend a blocked tool was inspected. Write the access mode used in `CLIENTE-BRIEF.md`:

```md
## Research Access
- Land-book: public browsing
- Mobbin: user screenshots
- React Bits: public browsing
- Higgsfield: CLI generation
```

For inspiration sites, collect only decisions:
- what pattern is useful
- why it fits this brand
- what should not be copied

Do not copy a site wholesale.

## Evidence Ledger

The agent must not claim it used a resource unless it records evidence.

Create this in `CLIENTE-BRIEF.md` or `DESIGN-DIRECTION.md`:

```md
## Evidence Ledger
| Need | Source | Access | Evidence | Decision |
|---|---|---|---|---|
| Hero motion | React Bits | code pasted by user | `components/HeroReveal.tsx` | Adapt timing and reduced-motion fallback |
| Pricing layout | Mobbin | screenshot | `references/mobbin-pricing.png` | Keep comparison table, change visual style |
| CTA button | Uiverse | public code | link/code snippet | Rebuild with brand tokens |
```

Valid evidence:
- public URL inspected
- screenshot supplied by user
- copied component code supplied by user
- installed package/block command
- generated Higgsfield asset path
- browser note from logged-in session

Invalid evidence:
- "inspired by modern sites"
- "similar to React Bits"
- unnamed references
- invented component APIs

## Component Intake Protocol

When a component or effect is found on React Bits, Uiverse, Magic UI, Aceternity, 21st.dev, or Shadcnblocks:

1. Record the exact component name and URL.
2. Prefer an install command, CLI command, MCP result, or pasted source code.
3. If code is visible but the agent cannot access/copy it, ask the user for the component code or screenshot.
4. Adapt it to the current brand tokens instead of pasting unchanged.
5. Keep only the component parts used by the page.
6. Add accessibility and reduced-motion support before shipping.
7. Record the final adapted file path in the Evidence Ledger.

Ask for the smallest useful thing:

```txt
I found the React Bits effect that fits this hero, but I cannot access the code from here.
Send me the component code or a screenshot of the code panel for:
- Component: [name]
- URL: [link]
```

Do not invent the component source. If source is unavailable, rebuild a simpler native version and label it as a fallback.

## Automation Ladder

Use the most concrete option available:

1. Installed MCP/CLI tool: ask the tool to search/install/generate.
2. Public page with source code: inspect and copy/adapt with attribution in the ledger.
3. Logged-in browser: user opens the tool and the agent inspects visible output.
4. User-provided pack: user sends links, screenshots, code, exports, or generated assets.
5. Fallback implementation: build a simpler original version and label the assumption.

Preferred automation:
- Shadcn MCP / CLI for shadcn blocks when available.
- Higgsfield CLI/MCP for generated hero/media assets.
- Browser connector for logged-in visual tools.
- Direct pasted source for React Bits/Uiverse components when the code panel is not accessible to the agent.

## Higgsfield Image/Video Workflow

Use Higgsfield when the landing needs original hero imagery, product/lifestyle shots, campaign visuals, cinematic references, or short motion assets.

Official setup:

```bash
npm install -g @higgsfield/cli
higgsfield auth login
npx skills add higgsfield-ai/skills
```

Higgsfield can also connect through MCP in compatible agents. It uses the Higgsfield account credit system, not a plain API key.

Use it for:
- hero background images
- product or service lifestyle scenes
- brand mood images
- case-study visuals
- short hero video concepts
- image variations for A/B direction testing

Do not use it for:
- real client photos that should come from the client
- legal/medical claims imagery without review
- fake testimonials, fake before/after, fake team photos, or fake client results

Add generated assets to the brief:

```md
## Generated Asset Plan
- Hero image: cinematic full-bleed shot of [subject], [mood], [lighting], [aspect ratio]
- Supporting image 1: [section purpose]
- Supporting image 2: [section purpose]
- Video loop: optional, only if it improves the hero
```

Before coding, create a mini reference board:

```md
## Reference Board
- Structure:
- Visual language:
- Motion:
- Proof:
- Micro-interactions:
- Avoid:
```

## Phase 0 - Setup

If no `package.json` exists:
1. Create or copy a React + Vite + Tailwind starter.
2. Edit `package.json`, `index.html`, title, meta description, favicon, and theme color.
3. Create `CLIENTE-BRIEF.md`.
4. Create `.env.example` and `.env.local` only if external URLs or APIs are needed.

Deployment basics:

```txt
public/_redirects: /* /index.html 200
vercel.json: rewrites to /index.html for SPA routes
```

Path aliases:
- `@/*` should point to `src/*` only if the project already uses aliases or has enough files to justify it.

## Phase 1 - Client Intake

Ask one question at a time when the user is present. Save answers in `CLIENTE-BRIEF.md`.

Required:
- brand/project name
- industry/category
- offer/product/service
- target audience
- desired emotion
- brand personality
- existing colors/fonts/assets
- competitors
- style references
- forbidden styles
- pages to create
- sections per page
- primary CTA
- secondary CTA
- where every button/link goes
- contact method: form, WhatsApp, phone, booking, email, checkout, demo, etc.
- proof: testimonials, clients, certifications, awards, metrics, case studies
- SEO keywords and target location if local
- languages/markets
- legal pages needed

If data is missing, make a labeled assumption:

```md
Assumption: The brand should feel premium, warm, and high-trust because it sells a high-consideration service.
```

Then summarize:
- what is being built
- for whom
- conversion goal
- pages
- content still missing
- assumptions

Wait for confirmation if the user is actively collaborating.

## Phase 1.5 - Page Map And Navigation

Create `ARCHITECTURE.md` with:
- route map
- page purpose
- SEO intent per page
- CTA map
- header links
- footer links
- legal/support links

Common marketing structure:

```txt
/                 Home
/about            Brand story or team
/services         Service overview
/work             Portfolio or case studies
/pricing          Packages, if useful
/contact          Form / booking / WhatsApp
/legal/privacy    Privacy
/legal/terms      Terms
```

Use only pages the project needs. A strong one-page site is better than five thin pages.

CTA map example:

```md
- Hero primary CTA -> /contact
- Hero secondary CTA -> #work
- Pricing CTA -> /contact?plan=pro
- Footer email -> mailto:name@example.com
```

## Phase 2 - Creative Direction

Before code, propose 3 distinct directions.

Each direction must include:
- concept name
- why it fits the brand
- hero idea
- section rhythm
- typography direction
- color direction
- image/media direction
- motion direction
- proof strategy
- what to avoid

Example:

```md
Direction A - Clinical Luxury
For a premium skincare clinic. White space, macro skin imagery, quiet serif headlines, soft medical blues, restrained motion, proof-heavy sections.
```

Pick one direction before implementing. If the user does not pick, use the strongest fit and state why.

## Phase 3 - Design System

Create `DESIGN.md` and `src/index.css`.

Define:
- brand neutrals
- primary color ramp
- accent color
- typography variables
- radius scale
- shadow/elevation scale
- motion durations/easing
- button styles
- section spacing
- image treatment

Prefer OKLCH and CSS variables. Avoid raw hex values scattered through components.

Typography:
- avoid Inter, Roboto, Arial, Open Sans, and default system stacks unless matching an existing brand
- pair one expressive display face with one readable body face
- no negative letter spacing
- no huge viewport-scaled text

Color:
- avoid default purple/blue gradients
- avoid one-hue palettes
- tint neutrals toward the brand
- check contrast before shipping

## Phase 4 - Build Shape

Keep the project simple until it needs more.

Recommended landing shape:

```txt
src/
  main.tsx
  App.tsx
  index.css
  content/
    landing.ts
  components/
    Button.tsx
    Section.tsx
    Hero.tsx
    ProofStrip.tsx
    FeatureStory.tsx
    FinalCta.tsx
```

Only add `features/`, `shared/`, or layered architecture when the project has real app complexity.

Build order:
1. content model
2. tokens
3. hero
4. conversion path sections
5. proof sections
6. CTA + footer
7. responsive pass
8. SEO pass
9. polish pass

Do not build all pages before the home page is excellent.

## Phase 5 - Hero Rules

The hero is the brand's first handshake. It must show the subject clearly.

Required:
- H1 includes the brand, product, place, person, or literal offer
- supporting copy says who it helps and why it matters
- primary CTA maps to a real action
- secondary CTA supports evaluation, proof, or exploration
- first viewport hints at the next section
- hero media is real or generated bitmap imagery when the subject is inspectable

Avoid:
- split text/image hero by default
- generic gradient backgrounds
- abstract blobs, bokeh, purple glow, glass cards
- fake dashboards unless the product is actually a dashboard
- huge vague claims like "Transform your workflow"
- hero metrics without real source

Hero patterns to consider:
- full-bleed product/place/person image with text over a quiet area
- cinematic hero with one precise animated focal point
- editorial hero with strong typography and documentary imagery
- tactile product hero with close crop, texture, and proof nearby
- interactive hero only when interaction explains the offer

## Phase 6 - Sections

Every section needs a job. No filler.

Common jobs:
- frame the pain
- show the transformation
- prove trust
- explain the mechanism
- compare alternatives
- show work or product detail
- answer objections
- make the next step feel easy

Each section must have one memorable choice:
- unusual layout
- specific imagery
- custom copy angle
- data/proof treatment
- motion behavior
- object/detail close-up
- brand-specific metaphor

Avoid:
- repeated icon-card grids
- "Features / Benefits / Testimonials / FAQ" as generic blocks
- same padding everywhere
- everything centered
- cards inside cards
- filler badges
- generic Lucide icon rows

## Phase 7 - Motion

Motion should make the brand feel alive and clarify the page.

Allowed:
- one strong hero entrance
- staggered reveals for grouped content
- scroll-linked detail reveals
- subtle image parallax
- CTA feedback
- before/after or product detail interactions

Required:
- `prefers-reduced-motion` fallback
- animate transform and opacity when possible
- total hero entrance under 1.5s

Escalation:
- CSS first
- `motion` for component state and simple entrances
- GSAP for split text, pinned scroll, scrub, parallax, or complex sequencing
- Three.js only when the 3D idea is central

## Phase 8 - SEO And Accessibility

Every public page needs:
- unique title, max 60 chars
- unique meta description, max 160 chars
- canonical URL
- Open Graph title, description, and image
- semantic headings
- useful alt text
- visible keyboard focus
- noindex for private/admin/thank-you pages when relevant

JSON-LD when useful:
- Organization
- LocalBusiness
- Product
- Service
- FAQPage
- BreadcrumbList
- Article

Add:
- `robots.txt`
- `sitemap.xml` or sitemap generation
- `public/_redirects` and `vercel.json` for SPA hosting when needed

Core Web Vitals:
- LCP under 2.5s
- CLS under 0.1
- INP under 200ms

Images:
- real or generated imagery that matches the actual subject
- width and height set
- lazy load below the fold
- preload only the real hero image when needed

## Phase 9 - Quality Gate

Before final:
- hero subject is visible in first viewport
- H1 is specific to the brand/offer
- every CTA has a destination
- no lorem ipsum
- no generic icon-card grid
- no purple/blue default gradient
- no section could be reused unchanged for another brand
- mobile checked at 375px
- desktop checked at 1280px
- keyboard focus visible
- images have dimensions and alt text
- reduced motion supported
- SEO metadata exists
- `npm run build` passes

Final summary:
- pages built
- creative direction used
- CTAs wired
- SEO added
- motion used
- checks run

## Prompt To Use With AI

```txt
You are designing a React + Tailwind landing page for [brand].

Goal:
[conversion goal]

Audience:
[who it is for]

Brand soul:
[3-5 concrete traits]

Pages:
[routes/pages]

SEO:
[keywords, target market, location if local]

References:
- Structure: [links]
- Visual language: [links]
- Motion: [links]
- Proof: [links or notes]

Avoid:
- generic SaaS layout
- purple/blue gradients
- repeated icon cards
- vague copy
- fake metrics
- decorative glassmorphism

First, propose 3 distinct creative directions.
For each direction include hero concept, section rhythm, typography, color, imagery, motion, proof strategy, and why it fits.
After choosing one, implement the landing with real content structure, strong hero, non-generic sections, responsive design, accessibility, SEO, and a buildable React + Tailwind codebase.
```
