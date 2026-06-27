---
name: ui-ux-pro-max
description: "UI/UX design intelligence for web and mobile. Includes 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types across 10 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, and HTML/CSS). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, and check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, and mobile app. Elements: button, modal, navbar, sidebar, card, table, form, and chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, and flat design. Topics: color systems, accessibility, animation, layout, typography, font pairing, spacing, interaction states, shadow, and gradient."
---

# UI/UX Pro Max — Design Intelligence

Comprehensive design guide for web and mobile. Contains 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types.

## How to Use

Load this skill when the user asks for:
- **New project direction**: style, palette, typography, layout patterns
- **Component design**: buttons, modals, forms, tables, charts
- **UX review**: accessibility, contrast, keyboard nav, touch targets
- **Design system**: tokens, color scales, spacing, animation curves
- **Responsive / adaptive**: breakpoints, layout, mobile-first

The skill provides embedded knowledge — no external scripts needed.

## Design System Generator (LLM-native)

When user requests a design direction, follow this workflow:

### Step 1: Extract Requirements
- Product type (fintech, ecommerce, SaaS, luxury, portfolio, etc.)
- Target audience (age, device, profile)
- Industry and tone keywords
- Reference URLs if provided

### Step 2: Generate 2-3 Direction Options

Each option includes:
- **Style name** and description
- **Color palette** (OKLCH format, 5 colors: primary, surface, accent, muted, border)
- **Typography pair** (heading font + body font from Geist/Inter/Serif options)
- **Key effects** (radius, shadows, glass, border style)
- **Vibe** in 3 words

### Step 3: Get User Choice → Generate @theme tokens

Once user picks a direction, output the full `@theme` block with OKLCH values.

## Quick Reference: Rule Categories

| Priority | Category | Key Checks |
|----------|----------|------------|
| 1 | Accessibility | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels |
| 2 | Touch & Interaction | Min size 44×44px, 8px+ spacing, Loading feedback |
| 3 | Performance | WebP/AVIF, Lazy loading, Reserve space (CLS < 0.1) |
| 4 | Style Selection | Match product type, Consistency, SVG icons |
| 5 | Layout & Responsive | Mobile-first, Breakpoints, No horizontal scroll |
| 6 | Typography & Color | Base 16px, Line-height 1.5, Semantic tokens |
| 7 | Animation | Duration 150–300ms, transform/opacity only, reduce-motion |
| 8 | Forms & Feedback | Visible labels, Error near field, Progressive disclosure |
| 9 | Navigation | Predictable back, Deep linking, Active state highlight |
| 10 | Charts & Data | Legends, Tooltips, Accessible color pairs |

## Design Direction Cheatsheet

### By Industry

| Industry | Recommended Styles | Color Direction | Font Direction |
|----------|-------------------|-----------------|----------------|
| Fintech/Crypto | Minimal, Dark mode, Bento grid | Blue/Indigo + Slate, Gold accents | Inter/Geist + mono numbers |
| Luxury/Perfume | Editorial, Dark elegant, Glassmorphism | Deep wine/charcoal/cream, Gold foil | Serif display + Geist body |
| Ecommerce | Clean, Colorful, Bento | Brand accent + warm neutrals | Geist + Playfair Display |
| SaaS/B2B | Minimal, Technical, Dense | Blue/Teal + Slate scale | Inter/Geist + mono |
| Portfolio | Editorial, Minimal, Brutalist | Muted + one vibrant accent | Serif + sans pair |
| Health/Wellness | Organic, Soft, Natural | Sage/terracotta/cream | Serif body + rounded sans |
| AI/Tech | Dark mode, Glassmorphism, Neon | Dark base + neon accent | Geist mono + sans |

### 20 Popular Styles

minimalism · glassmorphism · claymorphism · brutalism · neumorphism · bento grid · editorial · dark elegant · tech noir · organic · playful · retro · neon · liquid glass · duotone · monochrome · gradient-heavy · border-only · ultra-light · dense dashboard

## Pre-Delivery Checklist

- [ ] Contrast ≥4.5:1 body text
- [ ] Touch targets ≥44px
- [ ] prefers-reduced-motion respected
- [ ] All interactive states: rest, hover, active, focus-visible, disabled
- [ ] Loading → Empty → Error → Populated states
- [ ] Alt text on all images
- [ ] Keyboard nav: tab order matches visual
- [ ] Semantic heading hierarchy (one h1)
- [ ] OKLCH colors from @theme, no hardcoded hex
