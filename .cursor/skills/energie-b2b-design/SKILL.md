---
name: energie-b2b-design
description: Design system for B2B energy consulting websites targeting SMEs and industrial companies. Use for energy consulting, utility optimization, photovoltaic solutions, and energy audit websites. Provides professional, trustworthy design with ROI-focused messaging.
---

# EnergieExpert B2B Design System

Guidelines for professional B2B energy consulting websites. Focus: trust, competence, measurable results.

## Color Palette

```css
:root {
  /* Primary Colors */
  --color-navy: #1A365D;           /* Trust, professionalism */
  --color-green: #38A169;          /* Savings, sustainability, CTAs */
  --color-orange: #DD6B20;         /* Urgency, secondary CTAs */
  
  /* Neutrals */
  --color-white: #FFFFFF;
  --color-warm-gray: #F7FAFC;      /* Alternating section backgrounds */
  --color-text: #1A202C;           /* Primary text */
  --color-text-muted: #4A5568;     /* Secondary text */
  --color-border: #E2E8F0;         /* Borders, dividers */
  
  /* Semantic */
  --color-success: var(--color-green);
  --color-accent: var(--color-orange);
}
```

**Usage:**
- **Navy**: Headlines, headers, primary brand color
- **Green**: CTAs, success indicators, savings percentages, checkmarks
- **Orange**: Secondary CTAs, time indicators, urgency elements
- **Warm Gray**: Alternating section backgrounds for visual rhythm

## Typography

Google Font: DM Sans

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --font: "DM Sans", system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

/* Hierarchy */
h1 { font-size: clamp(1.65rem, 3.5vw, 2.35rem); font-weight: 700; line-height: 1.15; }
h2 { font-size: clamp(1.5rem, 2.5vw, 2rem); font-weight: 700; }
h3 { font-size: 1.0625rem; font-weight: 600; }
body { font-size: 1rem; line-height: 1.6; font-weight: 400; }
```

## Spacing System

```css
/* Consistent spacing scale */
--space-xs: 0.35rem;
--space-sm: 0.75rem;
--space-md: 1rem;
--space-lg: 1.5rem;
--space-xl: 2rem;
--space-2xl: 3rem;
--space-3xl: 4rem;

/* Section padding */
.section { padding: 4rem 0; }          /* Desktop */
.section { padding: 3rem 0; }          /* Tablet */
.section { padding: 2rem 0; }          /* Mobile */
```

## Layout Structure

### Page Sections (in order):

```
1. Sticky Header (logo + nav + CTAs)
2. Hero (full-width image, dark overlay, white text)
3. Trust Strip (brand logos, key stats)
4. Problem Section (pain points grid)
5. Services (tabbed interface)
6. Process (3-step timeline)
7. Case Study (social proof)
8. Differentiators (comparison table + USPs)
9. Benefits (value cards)
10. Quick Check (lead magnet wizard)
11. FAQ (accordion)
12. Final CTA (contact form)
13. Footer
14. Sticky Mobile CTA (mobile only)
```

### Container Widths

```css
.container { width: min(1120px, 100% - 2rem); margin-inline: auto; }
.container-narrow { width: min(640px, 100% - 2rem); margin-inline: auto; }
```

## Component Patterns

### Hero Section

Full-width background image with dark overlay:

```css
.hero {
  padding: 3rem 0 4rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('../assets/hero.jpg');
  background-size: cover;
  background-position: center;
}

/* Text colors for dark background */
.hero h1 { color: var(--color-white); }
.hero .hero-em { color: var(--color-green); }
.hero p { color: rgba(255, 255, 255, 0.9); }
```

### Buttons

```css
/* Primary - Green (main CTA) */
.btn-primary {
  background: var(--color-green);
  color: var(--color-white);
  padding: 0.65rem 1.15rem;
  border-radius: 10px;
  font-weight: 600;
  border: 2px solid var(--color-green);
}

/* Secondary - Orange (urgency) */
.btn-secondary {
  background: var(--color-orange);
  color: var(--color-white);
  border-color: var(--color-orange);
}

/* Outline - Navy (on light backgrounds) */
.btn-outline {
  background: transparent;
  color: var(--color-navy);
  border-color: var(--color-navy);
}

/* Outline Light (on dark backgrounds) */
.btn-outline-light {
  background: transparent;
  color: var(--color-white);
  border-color: var(--color-white);
}
```

### Cards

```css
.card {
  background: var(--color-white);
  border-radius: 12px;
  padding: 1.35rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 1px 2px rgba(26, 54, 93, 0.06);
}

.card:hover {
  box-shadow: 0 8px 24px rgba(26, 54, 93, 0.1);
}
```

### Trust Badges

```css
.trust-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  font-weight: 600;
}

.trust-badges .check {
  color: var(--color-green);
}
```

### Tabs

```css
.tab {
  padding: 0.65rem 1rem;
  border-radius: 999px;
  border: 2px solid var(--color-border);
  background: var(--color-white);
  font-weight: 600;
}

.tab.is-active {
  border-color: var(--color-navy);
  color: var(--color-navy);
}
```

### Accordion (FAQ)

```css
.accordion-trigger {
  width: 100%;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: var(--color-white);
  font-weight: 600;
  color: var(--color-navy);
}

.accordion-trigger::after {
  content: "+";
  color: var(--color-green);
}

.accordion-trigger[aria-expanded="true"]::after {
  content: "−";
}
```

## Responsive Breakpoints

```css
/* Mobile-first approach */
/* Base styles: Mobile (<480px) */

@media (min-width: 480px) {
  /* Small mobile adjustments */
}

@media (min-width: 768px) {
  /* Tablet */
  .hero-grid { grid-template-columns: 1fr; }
  .section { padding: 3rem 0; }
}

@media (min-width: 900px) {
  /* Large tablet / small desktop */
  .hero-grid { grid-template-columns: 1.1fr 0.9fr; }
}

@media (min-width: 960px) {
  /* Desktop - show full navigation */
  .nav-minimal { display: flex; }
  .header-cta { display: flex; }
  .menu-toggle { display: none; }
  .sticky-cta { display: none; }
}

@media (min-width: 1024px) {
  /* Full desktop */
  .section { padding: 4rem 0; }
}
```

### Mobile Optimizations

- **Touch targets**: Minimum 44px height for buttons/links
- **Stack layouts**: Single column for cards, forms
- **Full-width buttons**: CTAs span full width
- **Sticky mobile CTA**: Fixed bottom bar with main CTA
- **Hamburger menu**: Slide-in mobile navigation
- **Reduced padding**: Tighter spacing on mobile

### Tablet Optimizations

- **Two-column grids** where appropriate
- **Side-by-side hero** on landscape
- **Show more nav items**
- **Medium spacing**

### Desktop Optimizations

- **Full navigation** with all links visible
- **Multi-column layouts** (2-3 columns)
- **Hover effects** enabled
- **Side-by-side hero** (text + visual card)

## Accessibility

- Color contrast: 4.5:1 minimum for text
- Focus states: Visible outline on interactive elements
- Skip links: "Zum Inhalt springen" link
- ARIA labels: All interactive components
- Semantic HTML: nav, main, section, article, footer
- Reduced motion: Respect prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .btn { transition: none; }
}
```

## Key Metrics to Display

Always show concrete numbers:
- **Savings percentage**: "Ø 23% Ersparnis"
- **Customer count**: "420+ Kunden"
- **Time investment**: "15 Minuten"
- **ROI examples**: "€47.000 jährliche Ersparnis"

## Trust Elements

Required on every page:
1. BAFA certification badge
2. Customer count
3. Average savings
4. Case study/testimonial
5. "Keine Ersparnis - keine Kosten" guarantee

## Messaging Guidelines

**Tone:**
- Professional but approachable
- ROI-focused, concrete numbers
- Active voice
- Problem-solution framing

**Avoid:**
- Superlatives without proof
- Technical jargon
- Vague promises
- Pressure tactics

**Headlines pattern:**
- Problem statement → Solution benefit
- "Energiekosten senken. Ohne Aufwand. Ohne Risiko."

## Image Guidelines

**Hero images:**
- Industrial/factory settings
- Solar panels, energy infrastructure
- Professional workplace scenes
- Minimum 1920px wide

**Style:**
- Clean, professional
- Good lighting
- Relevant to energy/industry

## Performance

- Images: WebP format, lazy loading
- CSS: Critical CSS inlined
- Fonts: font-display: swap
- Smooth scroll: CSS scroll-behavior
- Safe area insets: For mobile notches/home indicators

```css
body {
  padding-bottom: env(safe-area-inset-bottom);
}
```
