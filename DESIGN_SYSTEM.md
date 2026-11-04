# America.gov — Design System Specification

> **Version:** 2.0.0  
> **Status:** Production-Ready / Living Design System  
> **Target Framework:** React 19 + TanStack Router + Tailwind CSS v4  
> **Primary Audience:** Engineers, Designers, Accessibility Auditors, Product Owners  

---

## 1. Executive Summary & Design Philosophy

**America.gov** is the official citizen interface for the United States Government, designed to give all Americans direct, transparent, and barrier-free access to 29,000+ government programs, records, and services powered by Structured Intelligence (SI).

### Core Design Tenets

1. **Civic Trust & Gravitas**  
   Every pixel reflects official government authority without cold bureaucracy. We pair timeless editorial typography (Rhymes serif) with precision Swiss modernist clarity (Helvetica Now Display).
2. **Direct Access, Zero Intermediaries**  
   No third-party ads, no tracking cookies, no sponsored results, no commercial clutter.
3. **Accessibility as a Constitutional Right (WCAG 2.2 AA / Section 508)**  
   High-contrast color pairings ($\ge 4.5:1$ for body text, $\ge 3:1$ for large headings), full keyboard navigability with visible focus rings, native screen-reader text (`.sr-only`), and complete `prefers-reduced-motion` fallbacks.
4. **Anti-AI Slop Restraint**  
   Zero candy-colored pills, zero purple neon gradients, zero generic sparkles, and zero static metadata badges. Labels and citations are presented with dignified typographical discipline.
5. **Adaptive Viewport Presence**  
   Tailored responsive behaviors across mobile (sliding bottom drawer sheets, thumb-friendly capsules) and desktop (centered modal dialogs, broad 87rem container grids).

---

## 2. Brand Architecture & Visual Identity

### 2.1 The Official Flag Mark

The Old Glory emblem serves as the primary visual anchor of civic authentication across header states:

- **Full Color Flag (`/site-assets/us-flag.svg`)**:  
  Used in the default header, official banner, and desktop navigation on light surfaces.  
  *Dimensions:* 28px width $\times$ 18px height (mobile: 24px $\times$ 15px), rounded with a 2px subtle corner radius.
- **Dark Monochrome Flag (`/site-assets/us-flag-dark.svg`)**:  
  Used exclusively inside dark-themed modal sheets, side drawers, and high-contrast night modes. Neutralized monochromatic grey tones preserve dignity without chromatic clash.

### 2.2 Wordmark Lockup

The primary header wordmark is rendered in custom geometric vector paths with optical kerning:

```html
<a href="/" class="flex items-center gap-2.5 site-home-link" aria-label="America.gov home">
  <img src="/site-assets/us-flag.svg" alt="U.S. Flag" width="28" height="18" class="rounded-[2px] shadow-xs" />
  <span class="font-semibold text-lg tracking-tight text-[#000c1f] dark:text-white">America.gov</span>
</a>
```

### 2.3 Official Federal Seals & Agency Badges

Federal department verification relies on authentic federal seals, never synthetic emojis or generic icons:

| Agency / Domain | Asset Path / Identifier | Visual Representation | Usage Context |
|---|---|---|---|
| **Department of State** (`state.gov`, `usembassy.gov`) | `/site-assets/ac9ec418e5b87762-....png` | Great Seal of the United States (Eagle & Shield) | Passports, consular guidance, voting abroad |
| **Department of the Interior** (`doi.gov`, `nps.gov`) | `/site-assets/6b0e58ea2470c358-....png` | American Bison Seal | National Parks, public lands, wildlife |
| **Department of Commerce** (`commerce.gov`) | `/site-assets/f8771bab4355a2c8-....png` | Federal Ship & Lighthouse Emblem | Economy, patents, census, business data |
| **Government Publishing Office** (`govinfo.gov`) | Styled Token Container | `#36526e` Blue roundel with white bold "GPO" | Federal statutes, Congressional records |
| **Election Assistance Commission** (`eac.gov`, `vote.gov`) | Great Seal Vector Badge | Federal seal with gold eagle and star halo | National Mail Voter Registration |
| **State Governments** (e.g. `in.gov`) | State Flag Roundel | `#001f4d` navy roundel with gold torch & stars | State election divisions, DMV services |

---

## 3. Color System & Theme Tokens

The color system is defined using **OKLCH** in CSS Custom Properties with automatic light/dark switching.

### 3.1 Color Scale & Palettes

```css
:root {
  /* Surface Fundamentals */
  --background-primary: #ffffff;
  --background-secondary: #f7f7f7;
  --background-tertiary: #f4f6f9;
  
  /* Text & Inks */
  --text-primary: #000c1f;        /* Deep federal midnight ink */
  --text-secondary: #4a5568;      /* Slate grey for secondary guidance */
  --text-tertiary: #718096;       /* Neutral muted caption */
  --text-disabled: #a0aec0;
  
  /* Federal Blue Signature */
  --color-federal-blue: #002d62;   /* Historic navy blue */
  --color-interactive-blue: #0066cc; /* Accessible interactive action */
  --color-link: #1a40a1;          /* Hyperlink underline accent */
  
  /* Borders & Dividers */
  --border-primary: rgba(0, 12, 31, 0.10);
  --border-secondary: rgba(0, 12, 31, 0.06);
  --border-focus: #0066cc;
}

.dark {
  /* Dark Mode Surfaces */
  --background-primary: #080a0f;  /* Deep graphite base */
  --background-secondary: #0c0e14;/* Elevated card canvas */
  --background-tertiary: #121620; /* Floating pill / dock surface */
  
  /* Dark Mode Inks */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
  
  /* Borders */
  --border-primary: rgba(255, 255, 255, 0.10);
  --border-secondary: rgba(255, 255, 255, 0.05);
}
```

### 3.2 Feedback & State Semantics

- **Success (`#34c759` / `#22c55e`)**: Official validation confirmation, copied clipboard alert.
- **Warning (`#e7a800`)**: Provisional ballot notices, deadline warnings.
- **Destructive (`#dc2626` / `#ef4444`)**: Error banners, report government fraud triggers.
- **Information (`#0066cc`)**: Official government website banner notice, citation anchor pills.

---

## 4. Typography System

The typographical architecture follows a dual-voice system:
1. **Editorial Serif (`--font-display`)**: Rhymes / Times New Roman serif for monumental manifesto headlines and key quotes.
2. **Engineered Sans (`--font-sans-display` & `--font-body`)**: Helvetica Now Display and modern system sans for high-legibility queries, forms, and instructions.

### 4.1 Type Scale Specification

| Token | Family | Size (Mobile $\to$ Desktop) | Line Height | Tracking | Weight | Semantic Application |
|---|---|---|---|---|---|---|
| `--text-heading-xl` | Display Serif | `3.25rem` $\to$ `5.25rem` | 1.05 | `-0.035em` | Regular (400) | Homepage manifesto ("America.gov uses SI...") |
| `--text-heading-l` | Display Serif | `2.5rem` $\to$ `4.25rem` | 1.10 | `-0.03em` | Regular (400) | Hero title ("Hello, America") |
| `--text-heading-m` | Sans Display | `1.75rem` $\to$ `2.5rem` | 1.20 | `-0.02em` | Medium (500) | Section headings, dialog titles |
| `--text-heading-s` | Sans Display | `1.25rem` $\to$ `1.5rem` | 1.30 | `-0.015em` | Semibold (600) | Card headlines, agency names |
| `--text-body-l` | Sans Body | `1.0625rem` $\to$ `1.1875rem` | 1.55 | `-0.01em` | Regular (400) | Search inputs, primary chat responses |
| `--text-body-m` | Sans Body | `0.9375rem` $\to$ `1.0rem` | 1.50 | `-0.01em` | Regular (400) | Default body text, explanations |
| `--text-body-s` | Sans Body | `0.8125rem` $\to$ `0.875rem` | 1.45 | `0.00em` | Regular (400) | Metadata, source counts, notes |
| `--text-label-s` | Sans Display | `0.75rem` | 1.30 | `+0.04em` | Medium (500) | Badges, button captions, pill text |

---

## 5. Spacing, Geometry & Radii

### 5.1 Radius Scale & Squircle Mathematics

To avoid harsh industrial boxes, curved elements implement mathematical radii or iOS-style squircle clip-paths:

- `--radius-4`: `4px` — Subtle flags, small badge corners.
- `--radius-8`: `8px` — Standard control buttons, inputs.
- `--radius-12`: `12px` — Inline citations, notification toasts.
- `--radius-20`: `20px` — Popover tooltips, small cards.
- `--radius-28`: `28px` — Composer input pill, drawer top curves.
- `--radius-40`: `40px` — Primary modals, dialog sheets.
- `--radius-48`: `48px` — Large hero card container.
- `--radius-full`: `9999px` — Action capsules, round buttons, status pills.

**Nested Radius Formula:**  
$$r_{\text{inner}} = r_{\text{outer}} - \text{padding}$$

*Example:* An outer dialog card with `radius-40` (`40px`) and `16px` inner padding uses child items with $\le 24\text{px}$ radius (`radius-24`).

### 5.2 Elevation & Shadow Layers

- **Shadow Elevation 1 (Floating Button)**:  
  `0 2px 8px -1px rgba(0, 12, 31, 0.08), 0 1px 3px -1px rgba(0, 12, 31, 0.05)`
- **Shadow Elevation 2 (Hero Dock & Composer)**:  
  `0 16px 45px rgba(0, 0, 0, 0.18)` / Dark: `0 20px 50px rgba(0, 0, 0, 0.65)`
- **Shadow Elevation 3 (Modal & Drawer Surfaces)**:  
  `0 25px 60px -15px rgba(0, 0, 0, 0.35)`
- **Frost Glass Backdrop**:  
  `backdrop-blur-md` (`12px`) or `backdrop-blur-frost` (`25px`) with `rgba(255, 255, 255, 0.85)` / `rgba(12, 15, 23, 0.90)`

---

## 6. Motion & Interaction Language

All transitions follow physics-based cubic-bezier timings with strict accessibility fallbacks:

```css
:root {
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);    /* Sheet sliding physics */
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1); /* Button expansion */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Micro-interactions */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);    /* Fade in/out */
}
```

### Motion Guidelines

- **Micro-Press Feedback**: Interactive buttons scale down smoothly on touch/click: `active:scale-[0.98]` or `active:scale-95`.
- **Prefe-Reduced-Motion Compliance**:  
  When `prefers-reduced-motion: reduce` is enabled, all animations, view transitions, and hero cyclers immediately revert to instant opacity or `0s` duration.

---

## 7. Component Specifications

### 7.1 Official US Government Trust Banner (`ImportedSectionUSGovernmentWebsites`)

The header incorporates the mandatory federal trust banner:
- Left: Miniature US Flag.
- Text: *"An official website of the United States government"*.
- Trigger: *"Here's how you know ⌄"*, opening an authoritative explanation dialog detailing `.gov` top-level domains and HTTPS encryption.

### 7.2 Hero Card & Image Carousel

- **Container**: Max width `max-w-4xl lg:max-w-[880px] xl:max-w-[940px]`, aspect ratio `aspect-[4/3] sm:aspect-[16/10]`.
- **Artwork**: Full-bleed real American photography (community members, veterans, logistics, families, parks).
- **Controls**: Symmetrical circular pill cycler (`size-12 sm:size-14`) with Previous, Next, and Auto-Play Pause states.

### 7.3 Search Dock & Auto-Resizing Composer

- **Hero Dock & Floating Scroll Dock**:
  - Height: `min-h-[64px] sm:min-h-[72px] md:min-h-[78px]`.
  - Shape: Rounded capsule (`rounded-full sm:rounded-[48px]`).
  - Text Input: Clean, unbordered textarea/input expanding upward as multi-line queries are typed (`max-h-[160px]`).
  - Controls: Attachment button (scanning official PDF notices), Voice input button (Web Speech API integration), and a Federal Blue Send circle.
  - Send button state: Disabled (`opacity-40 cursor-not-allowed`) when text is empty; bright active state with hover feedback when characters exist.

### 7.4 Bot Response Action Bar

Beneath each verified AI/SI assistant response, actions are arranged into a compact, unified toolbar:

```html
<div class="flex items-center gap-2 pt-1 flex-wrap">
  <!-- Sources Pill with overlapping agency seals -->
  <button class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-black/10 bg-[#f4f6f9] dark:bg-white/10 ...">
    <span class="relative flex items-center h-4 w-7 shrink-0">
      <img src="/site-assets/doi-seal.png" class="absolute left-0 size-4 rounded-full" />
      <img src="/site-assets/state-seal.png" class="absolute left-1.5 size-4 rounded-full z-10" />
      <img src="/site-assets/commerce-seal.png" class="absolute left-3 size-4 rounded-full z-20" />
    </span>
    <span>Sources</span>
  </button>

  <!-- Combined Like & Dislike Contiguous Capsule -->
  <div class="inline-flex items-center rounded-full bg-[#f4f6f9] border border-black/10 dark:bg-white/10 dark:border-white/10 px-2.5 py-1 gap-2">
    <button aria-label="Helpful"><ThumbsUpIcon /></button>
    <div class="w-[1px] h-3.5 bg-black/10 dark:bg-white/15" />
    <button aria-label="Not helpful"><ThumbsDownIcon /></button>
  </div>

  <!-- Copy Button -->
  <button class="size-8 rounded-full bg-[#f4f6f9] dark:bg-white/10 ..."><CopyIcon /></button>

  <!-- Download Button -->
  <button class="size-8 rounded-full bg-[#f4f6f9] dark:bg-white/10 ..."><DownloadIcon /></button>
</div>
```

### 7.5 Sources Modal & Mobile Drawer

Clicking the **Sources** pill triggers a dedicated verified citation surface:

- **Mobile Viewport (`< 640px`)**:
  - Renders as a native **bottom sheet drawer** sliding upward (`fixed inset-x-0 bottom-0 max-h-[85vh]`).
  - Top rounded corners: `rounded-t-[28px]`.
  - Includes a centered drag indicator bar (`w-10 h-1 bg-white/20 rounded-full`).
- **Desktop Viewport (`$\ge$ 640px`)**:
  - Renders as a centered modal card (`w-[460px] rounded-[28px] max-h-[82vh]`).
- **Surface Styling**: Deep obsidian dark theme (`bg-[#0c0e14] border border-white/10 text-white`).
- **Header**: Centered bold title **"Sources"** with a top-right circular close button `(✕)`.
- **Domain Rows**:
  - Left: Official circular agency badge (e.g. EAC Seal, GPO badge, State Dept seal, USA.gov eagle).
  - Center: Domain title (`vote.gov`, `eac.gov`, `govinfo.gov`) and source count (`5 sources`).
  - Right: Chevron down icon (`⌄`), smoothly rotating $180^\circ$ upon accordion expansion.
  - Sub-items: Primary document titles, descriptive summaries, and external link arrows (`↗`).
  - **Zero Emoji Rule**: Absolutely no decorative emojis anywhere in citations.

### 7.6 Site Menu Drawer & Feedback Dialog

- **Trigger**: Header "Menu" capsule button.
- **Drawer**: Slides smoothly from the right, providing direct access to:
  - *How it works*, *Privacy*, *About America.gov*, *Coming soon*, *Releases*, *FAQ*, and *Submit feedback*.
  - Built-in theme switcher and official agency directory shortcuts.
- **Feedback Dialog**: Accessible modal with details textarea, privacy assurance, and direct submission.

---

## 8. Accessibility & Compliance Checklist (Section 508 / WCAG AA)

| Requirement | Implementation Detail | Status |
|---|---|---|
| **Color Contrast** | Minimum 4.5:1 text contrast on light/dark; 7.1:1 achieved for primary text (`#000c1f` on `#ffffff`). | Pass |
| **Visible Focus** | Double outline focus rings: `focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none`. | Pass |
| **Touch Targets** | All interactive touch points $\ge 44\text{px} \times 44\text{px}$ on mobile screens. | Pass |
| **Screen Readers** | Critical off-screen cues announced via `.sr-only` and `aria-live="polite"`. | Pass |
| **Dialog Escapes** | `Escape` key listeners wired globally to dismiss all open modals, menus, and drawers. | Pass |
| **Reduced Motion** | CSS `@media (prefers-reduced-motion: reduce)` disables transition transforms and carousels. | Pass |

---

## 9. Developer Guidelines & File Structure

```
├── DESIGN_SYSTEM.md          # This complete specification
├── src/
│   ├── components/
│   │   ├── SiteMenuSheet.tsx # Navigation drawer & feedback triggers
│   │   ├── DemoAnswer.tsx    # Citations & assistant answer module
│   │   └── ui/               # Primitive shadcn/radix component kit
│   ├── routes/
│   │   ├── index.tsx         # Homepage with hero cycler & manifesto
│   │   └── chat.tsx          # Chat interface, sources drawer, & action bar
│   ├── styles/
│   │   └── site.css          # Core design tokens, curves, typography
│   └── styles.css            # Tailwind CSS v4 pipeline & OKLCH variables
```

---

*America.gov Design System — Crafted for civic trust, accessibility, and clarity.*
