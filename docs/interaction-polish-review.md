# Interaction polish review

Date: September 8, 2026 (Asia/Riyadh). Review branch only.

Q approved the current font/style direction and requested a more competitive, reference-informed experience. Shaddad's live mobile site (https://tryshdad.com/) was revisited for hierarchy and choice/FAQ clarity. No images, testimonials, promotional claims, popup campaign, or proprietary code were copied.

Q briefly requested DM Sans, then explicitly reverted that preference before any font edit was applied. The approved pairing remains **IBM Plex Sans Arabic + Manrope**. Font files, configuration, type scale, and loading architecture are unchanged in this patch.

## Bounded changes

- Homepage category tiles now have visible directional arrows with logical RTL placement and a pressed-state color. All six real form destinations remain intact.
- Start-here's existing project-owner card gets restrained teal emphasis and a clear action treatment. The other two paths remain available with their original order, copy, and destinations. Card feedback is color-based with no added movement.
- Whole-card audience links expose their existing title/action as an explicit accessible name; the prior accessibility snapshot showed unnamed links.
- The open FAQ has a clear panel treatment and aligned answer inset. Existing Radix single-open/collapsible behavior and keyboard interaction remain. Expanded-arrow and primary-action colors were explicitly checked in dark mode to avoid inherited white text on mint.

## Validation

- Production build passed. Homepage 6.53 kB / 143 kB first-load JS; start-here 2.44 kB / 127 kB. No dependency added.
- 21/21 admin-auth, language, typography, and interaction regression tests passed.
- 64 responsive measurements: homepage, entry page, project form, consultant form; Arabic/English; light/dark; 320/390/768/1440. No measured horizontal overflow or clipped headings/labels/buttons.
- All six homepage category links clicked and reached their matching form category at step 2. All three entry cards clicked and reached the correct owner/contractor/consultant destination.
- FAQ mouse/keyboard interaction kept only one answer expanded. Final dark expanded chevron computed navy rgb(21,43,84) on mint; final primary action text and arrow also computed navy on mint.
- Reduced-motion 320px English entry view: headline opacity 1, card transform none, one primary path, no overflow.
- Mobile Arabic/light, English/dark, and expanded dark FAQ screenshots inspected. Focused local browser warning/error log empty before the final color-only correction.
- No application submitted, attachment uploaded, marketing consent changed, new tracking added, or production/main deployment performed.

Production merge remains a separate Q approval. The previous initial-language rendering tradeoff is documented in `typography-review.md` and is unchanged here.
