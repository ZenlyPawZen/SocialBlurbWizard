# Social Formatter Design Guidelines

## Design Approach
**System**: Utility-First Design inspired by Linear, Stripe Dashboard, and Notion
**Rationale**: This is a function-focused tool where efficiency and clarity drive user satisfaction. Clean, minimal interface with zero friction between intent and action.

## Core Design Principles
1. **Workflow Clarity**: Visual hierarchy guides users through input → transform → copy flow
2. **Platform Identity**: Subtle visual cues distinguish each platform without overwhelming color
3. **Information Density**: Compact yet breathable layout maximizing viewport efficiency
4. **Zero Friction**: One-click copy, live character counts, instant feedback

---

## Typography System

**Font Families** (Google Fonts via CDN):
- Primary: `Inter` (weights: 400, 500, 600)
- Monospace: `JetBrains Mono` (weight: 400) for character counts

**Type Scale**:
- Page Title: `text-2xl font-semibold` (24px)
- Section Headers: `text-sm font-semibold uppercase tracking-wide` (12px, letterspacing)
- Platform Names: `text-base font-medium` (16px)
- Input Labels: `text-sm font-medium` (14px)
- Body/Input Text: `text-base font-normal` (16px)
- Character Counts: `text-xs font-mono` (12px monospace)
- Helper Text: `text-xs` (12px)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of `2, 3, 4, 6, 8, 12, 16`
- Component padding: `p-4` to `p-6`
- Section gaps: `gap-6` to `gap-8`
- Inter-element spacing: `space-y-3` to `space-y-4`
- Card padding: `p-6`

**Container Structure**:
- Max width: `max-w-5xl mx-auto` (1024px centered)
- Page padding: `px-4 md:px-6 py-8 md:py-12`
- Single-column layout (no multi-column needed for this tool)

**Grid Layout** (Output Section):
- Desktop: 2-column grid for platform cards (`grid grid-cols-1 lg:grid-cols-2 gap-4`)
- Mobile: Single column stack
- All 5 platforms visible without scrolling on desktop

---

## Component Library

### Input Section (Top)
**Container**: Bordered card with subtle elevation
- Background: Light neutral surface
- Border: Thin border with rounded corners `rounded-lg border`
- Padding: `p-6`
- Stack fields vertically with `space-y-4`

**Components**:
1. **Main Textarea**: 
   - Height: `h-32` (allows ~6 lines visible)
   - Placeholder: "Enter your marketing blurb..."
   - Auto-resize on focus (up to `h-48` max)
   
2. **Optional Fields Row**: 2-column grid on desktop, stack on mobile
   - Hashtags input (left): Placeholder "#marketing #social"
   - CTA input (right): Placeholder "Learn more at..."
   
3. **Helper Text**: Under each input in muted color
   - "This will be formatted for each platform"
   - "Optional: Add relevant hashtags"
   - "Optional: Add call-to-action or link"

### Platform Output Cards
**Card Structure**:
- Bordered container with `rounded-lg border`
- Header section with platform icon/name + character count
- Content preview area with formatted text
- Copy button at bottom

**Header Layout** (flex, space-between):
- Left: Platform icon (via Heroicons or Font Awesome) + Name
- Right: Character count badge `"245/280"` in monospace

**Content Area**:
- Min height: `min-h-[120px]`
- Padding: `p-4`
- Light background to differentiate from card
- Show actual formatted text with line breaks
- Truncation indicator: `"..."` with muted "(truncated)" text if over limit

**Copy Button**:
- Full-width at card bottom
- Text: "Copy for [Platform]"
- Success state: Checkmark icon + "Copied!" (2sec duration)

**Platform Order** (top-to-bottom, left-to-right):
1. LinkedIn (top-left)
2. X/Twitter (top-right)
3. Threads (middle-left)
4. Instagram (middle-right)
5. Facebook (bottom, spans full width on desktop or continues stack)

### Visual Differentiation
Use **extremely subtle** platform color accents:
- LinkedIn: Blue tint to icon/border
- X/Twitter: Neutral with slight brand hint
- Threads: Purple tint
- Instagram: Gradient hint
- Facebook: Blue tint

Keep accents minimal (5-10% opacity) - this is not a colorful dashboard.

---

## Interactive States

**Input Fields**:
- Default: Neutral border
- Focus: Thicker border, subtle glow
- Filled: Slightly darker background

**Copy Buttons**:
- Default: Subtle background, medium font weight
- Hover: Darker background, slight scale
- Active: Further darkened
- Success: Green background with checkmark, fades back after 2s

**Character Count**:
- Normal: Neutral color
- Warning (90%+): Amber/yellow color
- Over Limit: Red color with bold weight

---

## Page Structure

**Layout Flow** (single column, top-to-bottom):

1. **Header** (`py-8`)
   - App title: "Social Formatter"
   - Subtitle: "Transform marketing copy into platform-ready posts"
   
2. **Input Section** (`mb-8`)
   - Marketing blurb textarea
   - Optional hashtags + CTA row
   
3. **Output Section**
   - Section label: "FORMATTED POSTS" (uppercase, tracked)
   - 2-column grid of 5 platform cards
   
4. **Footer** (minimal, `py-6`, subtle border-top)
   - Small text: "No data stored. All processing happens in your browser."

**No Hero Section**: This is a utility tool - jump straight into functionality.

---

## Accessibility & UX

- All inputs have visible labels (not just placeholders)
- Character counts read by screen readers
- Copy buttons have clear aria-labels
- Keyboard navigation: Tab through inputs → Tab through copy buttons
- Focus indicators highly visible
- Success feedback both visual and text-based

---

## Images
**None required** - This is a text-based utility with no hero section or decorative imagery.

---

## Animations
**Minimal and functional only**:
- Copy button success state: Smooth 0.2s transition
- Character count color change: 0.15s transition
- No scroll animations, no decorative motion