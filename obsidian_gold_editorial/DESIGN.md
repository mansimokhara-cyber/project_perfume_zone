---
name: Obsidian & Gold Editorial
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c19'
  on-tertiary-container: '#838480'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e3e3de'
  tertiary-fixed-dim: '#c6c7c2'
  on-tertiary-fixed: '#1a1c19'
  on-tertiary-fixed-variant: '#454744'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
  button:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

The design system is centered on a high-end editorial aesthetic for a luxury boutique fragrance brand. It evokes an atmosphere of exclusivity, mystery, and sensory refinement. The brand personality is "Quiet Luxury"—it does not shout, but commands attention through meticulous detail and vast negative space.

The style is a hybrid of **Modern Minimalism** and **Glassmorphism**. It utilizes high-contrast color pairings to create a dramatic, "moody" environment. Layouts should mimic high-fashion magazines, prioritizing large-scale imagery and precise typographic hierarchy over dense information. Glassmorphic elements are reserved for interactive layers to suggest the transparency and fragility of glass perfume bottles.

## Colors

The palette is anchored by **Deep Obsidian Black** (#050505), used for primary surfaces and high-impact typography to create depth. **Warm Champagne Gold** (#D4AF37) serves as the accent color, reserved for calls to action, active states, and premium detailing.

**Muted Cream** (#F5F5F0) acts as the primary background for content-heavy sections to ensure legibility and a soft, organic feel. Neutral tones are used sparingly for borders and subtle UI metadata. Surface transitions should favor soft fades to maintain the "moody" atmosphere.

## Typography

This design system uses a classic pairing of a high-contrast serif for headings and a geometric sans-serif for functional text. **Playfair Display** provides the editorial "voice," emphasizing the boutique nature of the brand. For body text, **Montserrat** is used with generous tracking (letter-spacing) to enhance the sense of luxury and airiness.

All labels and navigational elements should use uppercase styling with increased letter spacing to create a structured, architectural feel. Line heights are intentionally loose to prevent the interface from feeling crowded.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop (12 columns) with significant outer margins to center the focus. A "wide-gutter" philosophy is applied to create an airy, gallery-like experience. 

- **Desktop:** 64px side margins, 24px gutters.
- **Tablet:** 40px side margins, 16px gutters.
- **Mobile:** 20px side margins, 12px gutters.

Vertical spacing between sections is aggressive (up to 120px) to allow each fragrance story or product card to stand alone without competition. Alignment should be primarily centered for hero sections and left-aligned for product details.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional shadows. 

1.  **Base Layer:** Muted Cream (#F5F5F0) for daytime/standard browsing.
2.  **Product Cards:** Flat surfaces with ultra-thin 1px borders in Obsidian (#050505) at 10% opacity.
3.  **Floating Elements:** Navigation bars and drawers use a "Frosted Glass" effect: Backdrop blur of 20px, 60% opacity of the Cream or Obsidian base, and a 1px white or gold top-border highlight.
4.  **Shadows:** When necessary, use "Ambient Shadows"—soft, extremely large blurs (40px+) with low opacity (5%) and a slight hint of Warm Gold in the shadow tint.

## Shapes

The design system utilizes **Sharp (0px)** roundedness. This reinforces the high-fashion, architectural, and "boutique" aesthetic. All buttons, input fields, and product cards must feature crisp 90-degree angles. This severity is balanced by the soft typography and organic shapes found within the fragrance photography.

## Components

### Buttons
- **Primary:** Obsidian black background, white text, 0px radius. Hover state transitions to Champagne Gold background.
- **Secondary/Ghost:** 1px Obsidian border, transparent background, uppercase text with tracking.
- **CTA:** For high-conversion points, use a Champagne Gold background with Obsidian text.

### Cards
- **Product Cards:** Image-centric. The image should occupy 80% of the card area. Text is placed underneath in centered alignment. No outer border or shadow; use white space to define the card boundaries.

### Navigation & Drawers
- **Header:** Glassmorphic overlay with a 1px bottom border in Gold.
- **Mobile Menu:** Full-screen Obsidian overlay with 80% opacity and a high backdrop blur.

### Inputs
- **Text Fields:** Simple 1px bottom border (underline style). Labels sit above in `label-caps` style. Active state changes border color to Champagne Gold.

### Additional Elements
- **Fragrance Notes Chips:** Rectangular, sharp-edged chips with a 1px border and light cream fill.
- **Dividers:** Horizontal lines should be 1px thick, spanning the container width, using a very light neutral gray or gold for premium sections.