# Bilingual typography review

Date: September 7, 2026. Review branch only; production approval is separate.

## Decision

Use IBM Plex Sans Arabic for Arabic glyphs and Manrope for Latin glyphs. Use three deliberate weights: regular 400, medium 500, semibold 600. The goal is a calm, premium, contemporary Qatar/GCC interface with readable small-screen copy, not ornamental typography.

The previous review used Cairo / Inter, a 750-weight hero, and 11-13px supporting text in many places. This pass changes the family, weight hierarchy, scale, line height, label wrapping, mixed-script numerals, and loading behavior of the fonts themselves. Page structure, public claims, data model, tracking rules, and submission endpoints are unchanged.

## References inspected

- [Shaddad](https://tryshdad.com/): live rendered Arabic UI declares IBM Plex Sans Arabic. Section headings inspected at 24px/700 and supporting text near 14-15px/400. This is the white-undershirt retail reference identified from Q's description; text embedded inside ad/banner images was not assumed to use that same font.
- [Salla](https://salla.com/): live Arabic landing page uses the Ping AR + LT family with distinct light/medium/bold weights. Mobile headline inspected at 32px; body at 16px. Used as a hierarchy/spacing reference only; no proprietary font file was copied.
- [Thmanyah company site](https://company.thmanyah.com/): inspected live body text using IBM Plex Sans Arabic Regular / SemiBold, including generous paragraph line height.
- [IBM Plex official documentation](https://www.ibm.com/design/language/typography/typeface/) and [font source](https://github.com/IBM/plex/) establish the family and OFL source.
- [Manrope on Google Fonts](https://fonts.google.com/specimen/Manrope) and its [OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt).

A local, unshipped specimen compared Cairo, IBM Plex Sans Arabic, and Tajawal with identical Arabic content, then Inter, Manrope, and DM Sans with identical English content. IBM Plex Arabic was selected for its clearer, less squared-off rhythm and relationship to the requested Saudi retail reference. Manrope was selected for its lighter geometric English headings and clean interface numerals. These are design judgments, not an objective claim that one font is universally best.

## Implementation

- `app/layout.js`: Next font configuration, three real Arabic weights, one variable Latin font, `display: swap`.
- `app/globals.css`: shared bilingual stack and lighter base headline weight.
- `app/typography.css`: separate-script heading rules, 15-16px primary copy, 14px labels/supporting copy, 13px captions, numeric treatment, form/landing/consent typography, and robust category reflow.
- `tailwind.config.js`: existing weight utilities map to the installed 400/500/600 system.
- `components/AudiencePathCard.jsx`: shared hook for readable compact action labels.
- `tests/typography.test.mjs`: regression guards for loading, scripts, weights, spacing, readable tokens, reflow, and licenses.
- `public/fonts/licenses/`: complete OFL notices distributed with the fonts.

The Manrope fallback adjustment is disabled intentionally: its generated Arial fallback would otherwise intercept Arabic glyphs before Plex. Plex retains its metric-adjusted fallback. Browser platform-font inspection confirmed actual Plex SemiBold Arabic glyphs and Manrope Latin/punctuation glyphs, not just the declared CSS family names.

## Validation and evidence

- Final production build passed. Homepage remains 6.53 kB route / 143 kB first-load JS; no runtime JavaScript dependency was added for typography. Admin-auth, typography, and language tests: 15/15 passed.
- 224 settled layout measurements: 8 public route variants, Arabic/English, light/dark, widths 320/360/390/430/768/1024/1440. Measurements waited for document language and fonts to settle. No horizontal overflow, clipped measured headings/labels/buttons, or sub-16px visible narrow-screen text inputs.
- Visual screenshots reviewed for Arabic/English desktop home, Arabic/English mobile home, 320px dark Arabic home, Arabic entry choices, Arabic mixed-script project details, English consultant profile step, and Arabic confirmation.
- Increased text spacing exposed long English category labels overflowing their flex-column width. Width bounding and word wrapping were added, with a regression test. Final rebuilt 320px English retest passed with line height 1.5, letter spacing 0.12em, word spacing 0.16em, and paragraph spacing 2em. The full 224-case matrix was repeated successfully after the language repair.
- Local mocked project submission: required-field errors, long Arabic text and diacritics, Arabic/Latin budget notation, contact data, a mocked 503 failure, successful retry, and confirmation. Retried payload matched. All API writes were intercepted by the local fixture; no real application or upload was sent.
- Local mocked consultant submission: long company name, long service category, optional profile-only step, and success confirmation. No attachment required and no production data touched.
- Blocked-font test rendered readable Arial fallback, with visible headline and no measured overflow. Font blocking and network/CPU overrides were removed afterward.
- Optimized observed Arabic font requests: 4 WOFF2 files, 129,856 decoded bytes (three Plex Arabic weights + one variable Manrope Latin file). Earlier four-weight prototype requested 221,520 bytes including duplicate Latin subsets; the selected configuration removes those requests. The prior Cairo/Inter preview measured 112,788 font bytes, so this is a modest increase versus that baseline, not a claim of a smaller total font payload.

## Approved initial-language repair

Cold-load simulation: 390x844, 150ms latency, approximately 0.8Mbps download, 4x CPU slowdown. This is diagnostic lab evidence, not a real-user performance score.

- Arabic: first contentful paint around 800ms; recorded layout-shift sum about 0.019; headline visible and fonts completed loading.
- English: first contentful paint around 812ms, but a later Arabic-to-English hydration switch produced a large shift (about 0.249 for that event; about 0.268 total).
- The unchanged prior review also reproduced the language-switch shift (about 0.252). Therefore the large English jump predates this font pass.

The previous app started `LangProvider` in Arabic and read English query/storage preference in an effect. Q explicitly approved including the initial-language repair in this review.

- `middleware.js` resolves the allowlisted `lang` query first, then the language preference cookie, then Arabic. It overwrites its internal request header and excludes APIs/static assets.
- `app/layout.js` renders the matching HTML language/direction and passes that same language into `LangProvider`; the first client render matches the server. No content is hidden to mask hydration.
- `lib/LangContext.js` remembers an explicit UI language in a first-party preference cookie, updates the current language query without dropping UTMs/hash, and retains a compatibility local-storage write. The preference cookie is separate from advertising consent; no tracking consent or attribution behavior was changed.
- Old local-storage-only preferences cannot be read by the server. On the first visit after this change, a visitor with no language query/cookie gets Arabic; choosing English once persists the server-readable preference. This deliberately avoids restoring the old after-paint language flip.
- Architectural tradeoff: request-aware initial language opts HTML pages into server rendering; they are no longer statically prerendered. Static font/image/JS assets remain unchanged and cacheable. Middleware is 26.7 kB in the build report. Local HTML responses were HTTP 200 with private/no-store cache control, preventing cross-language shared HTML caching. This is not a production latency/cost guarantee.
- Five raw HTTP cases passed: explicit English, explicit Arabic over an English cookie, cookie-only English, English paid-social form URL over an Arabic cookie, and invalid language falling back to Arabic. A forged unsupported locale header was overwritten.
- English headline and direction were correct with JavaScript disabled. Switching languages preserved the Instagram UTM and hash; the choice persisted on a subsequent route with no language query.
- Repeat English cold-load simulation under the same network/CPU conditions: first contentful paint 956ms and recorded layout-shift sum 0.00024, versus about 0.268 before the repair. No Arabic-first content, hidden headline, or horizontal overflow was observed. These are individual local lab runs, not real-user performance claims.

Implementation references: [Next.js 14 request headers](https://nextjs.org/docs/14/app/api-reference/functions/headers) and [middleware request-header handling](https://nextjs.org/docs/14/app/building-your-application/routing/middleware).
