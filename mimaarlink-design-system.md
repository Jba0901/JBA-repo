# MimaarLink Design System

This is the fixed design standard for MimaarLink website, app UI, Instagram, Meta ads, WhatsApp graphics, flyers, PDFs, and future pitch material.

## 1. Brand Positioning

MimaarLink is a Qatar-focused platform connecting project owners with contractors and consultant offices.

The brand should feel:

- Professional
- Trustworthy
- Qatar/GCC business-ready
- Clear and practical
- Modern, but not flashy
- Construction/project marketplace, not a cheap handyman app

Primary audiences:

- Project owners: villa owners, homeowners, businesses, facility managers, real estate people, shop/office owners.
- Contractors: fit-out, MEP, HVAC, electrical, plumbing, civil maintenance, joinery, flooring, painting, aluminum/glass, and related providers.
- Consultant offices: design, supervision, approvals, quantity surveying, tendering, project management, and engineering review.

Core promise:

> Post your project and get matched with suitable contractors or consultants in Qatar.

Arabic positioning:

> انشر مشروعك وسنساعدك في الوصول إلى مقاولين أو استشاريين مناسبين في قطر.

## 2. Official Palette

Use this palette everywhere. Do not introduce random colors.

| Role | Hex | Usage |
|---|---:|---|
| Primary Navy | `#152B54` | Headlines, main brand authority, public light-mode text, navy buttons |
| Deep Night Navy | `#0D1B2A` | Dark sections, footer, dark surfaces, premium panels |
| Primary Teal | `#00B59E` | Main CTAs, active states, trust accents, success |
| Light Teal | `#D0F2EE` | Soft icon backgrounds, trust cards, highlights |
| Amber Accent | `#FFB638` | Contractor emphasis and limited attention highlights |
| White | `#FFFFFF` | Cards, clean sections, text on dark backgrounds |
| Soft Background | `#F5F4F1` | Main page background |
| Muted Text | `#5F6B7A` | Descriptions, helper text |
| Border | `#E3E7EA` | Cards, inputs, separators |
| Dark Background | `#07111D` | Deep page backgrounds |
| Dark Card | `#142A44` | Raised dark panels |
| Dark Border | `#24384F` | Dark-mode borders |
| Light Text | `#F8FAFC` | Text on dark sections |
| Muted Light Text | `#A9B6C6` | Secondary text on dark sections |
| Error | `#EF4444` | Form errors, destructive actions |
| Info | `#38BDF8` | Neutral information |

Color usage ratio:

- 60 percent white or soft background.
- 25 percent primary navy.
- 10 percent teal.
- 5 percent light teal or amber accents.

Do not make the brand dominated by amber, purple, red, brown, or heavy gradients.

## 3. Logo Rules

Use only the official MimaarLink logo assets:

- `public/logo.png`
- `public/logo-dark-transparent.png`
- `public/brand/mimaarlink-official-logo-source.png`

Rules:

- Do not redraw the logo.
- Do not recolor it randomly.
- Do not stretch, squeeze, rotate, crop badly, outline, glow, or shadow it.
- Keep clear space around it equal to at least half the logo mark height.
- Use it on white, soft background, or simple dark navy backgrounds only.
- Do not place it on busy construction photos unless it is inside a clean white/navy header block.

## 4. Typography

Use the shared type system in `app/typography.css` and the build-time self-hosted font configuration in `app/layout.js`.

Current review direction (September 7, 2026):

- Arabic: **IBM Plex Sans Arabic**, real weights 400 / 500 / 600.
- English and Latin numerals: **Manrope**, variable font with the same 400 / 500 / 600 UI weight scale.
- The font stack puts Manrope before Plex so Latin characters in Arabic screens use Manrope; Arabic glyphs fall through to Plex. Do not insert an Arial fallback ahead of Plex.
- Use 400 for paragraphs, 500 for labels, and 600 for headlines/actions. Avoid synthetic bold or italic and unnecessarily heavy 800/900 weights.
- Fonts are downloaded at build time and served from the site's own deployment. No runtime Google Fonts stylesheet or request.
- Keep the font licenses in `public/fonts/licenses/` with the deployed assets.
- See `docs/typography-review.md` for the comparison, rationale, and validation record.

Rules:

- Arabic must be readable first.
- Do not use negative letter spacing in Arabic.
- Avoid decorative Arabic fonts.
- Use bold headlines, medium subheadings, normal body.
- Keep paragraphs short.

Suggested scale:

- Hero headline mobile: 34-42 px, with separate Arabic/English line-height and wrapping.
- Hero headline desktop: approximately 46-60 px.
- Section headline: 28-32 px.
- Card title: 16-20 px.
- Body: 15-16 px; secondary supporting copy 14 px.
- Captions: 13 px. Compact mobile navigation may use 12 px.
- Phone inputs remain at least 16 px on narrow/coarse-pointer screens.
- Arabic headlines: natural letter spacing, line-height around 1.4. English headlines: restrained negative tracking, line-height around 1.17-1.25.
- Long category labels must have a bounded width and wrap under increased user text spacing; do not hide overflow to conceal clipped labels.

## 5. Layout Rules

General:

- Mobile-first.
- Clean white/soft background.
- Use strong spacing.
- Use clear sections.
- Use cards only when grouping an item or form section.
- Avoid nested cards.
- Avoid visual clutter.

Cards:

- Radius: 18-26 px for marketing cards.
- Radius: 12-16 px for form/admin cards.
- Border: `#E3E7EA`.
- Shadow: soft and subtle only.
- Hover: small lift, not dramatic.

Buttons:

- Main CTA: teal background `#00B59E`, white text.
- Secondary CTA: white background, navy text, subtle border.
- Consultant/navy CTA: `#152B54`, white text.
- Contractor emphasis CTA: amber `#FFB638`, navy text, used sparingly.
- Minimum mobile height: 44 px.
- Button text must not wrap awkwardly.

Icons:

- Use consistent line icons.
- All icons in the same group must have equal visual size.
- Prefer icon containers of 40, 44, 48, or 52 px.
- Do not mix filled emoji-style icons with line icons.

## 6. Website Page Rules

Homepage:

- Arabic default.
- One main promise.
- Direct CTA to post a project.
- Secondary CTA for contractor/consultant application.
- Show project owner, contractor, and consultant paths clearly.
- Include trust/process sections, not generic marketing fluff.

Start-here page:

- Must be the simplest page.
- Three choices only:
  - أحتاج مقاول
  - أنا مقاول
  - أنا استشاري
- Each card needs one icon, one title, one short line, and one obvious action.
- No heavy text or oversized panels.

Project form:

- Step-by-step.
- Broad project categories only:
  - تشطيبات / تجديد
  - صيانة
  - MEP / تكييف / كهرباء / سباكة
  - أعمال مدنية
  - استشارات / تصميم / إشراف
  - أخرى
- User can explain exact details in the description.
- Upload guidance must say: PDF, JPG, PNG, WEBP. Max 2MB per file.

Contractor/consultant form:

- Step-by-step.
- Make provider type obvious.
- Consultant option must not feel hidden.
- Ask for CR, company, contact person, WhatsApp, service categories, service areas, project size range, and documents.
- Use status language carefully:
  - Applied
  - Pending documents
  - Under review
  - Active - CR checked
  - Verified
  - Suspended

Admin:

- Prioritize operational clarity over decoration.
- Show application time.
- Show provider type.
- Show status.
- Show documents and download buttons.
- Make project/requester status links visible.

## 7. Copy Rules

Tone:

- Direct.
- Practical.
- Business-like.
- Not exaggerated.
- Not too formal.

Preferred Arabic phrases:

- مقاولين مناسبين
- استشاريين مناسبين
- مقدمي خدمة مناسبين
- فرص مشاريع مناسبة
- عروض واضحة
- مراجعة أولية
- تنسيق محلي
- قارن العروض قبل الاختيار
- انشر مشروعك
- انضم كمقاول
- انضم كمكتب استشاري

Avoid:

- نضمن أفضل سعر
- نضمن أفضل مقاول
- مقاولين موثوقين 100%
- مشاريع مضمونة
- جودة مضمونة
- نحن مسؤولون قانونياً عن التنفيذ
- أرخص سعر في قطر

English should stay short and professional.

## 8. Meta Ads System

Meta ads are the priority marketing channel.

Primary destination:

- `https://mimaarlink.com/start-here`

Ad formats:

- Feed square: 1080 x 1080.
- Feed portrait: 1080 x 1350.
- Story/Reel: 1080 x 1920.

Ad creative structure:

- Top: short Arabic hook.
- Middle: clean visual, icon, or construction/project image.
- Bottom: CTA button and logo.

Project owner ad hooks:

- عندك مشروع وتحتاج مقاول؟
- انشر مشروعك واستلم عروض مناسبة
- قارن العروض قبل ما تختار
- وفر وقت البحث عن المقاولين
- خلنا نوصلك بمقاولين مناسبين في قطر

Contractor ad hooks:

- مقاول في قطر؟
- استلم فرص مشاريع مناسبة
- انضم لشبكة معمار لينك
- سجّل بيانات شركتك مجاناً

Consultant ad hooks:

- مكتب استشاري في قطر؟
- استلم فرص تصميم وإشراف
- انضم كمكتب استشاري
- فرص للمكاتب الاستشارية في قطر

CTA examples:

- انشر مشروعك
- سجّل الآن
- انضم كمقاول
- انضم كاستشاري
- ابدأ من الرابط

Ad visual rules:

- Use one main headline only.
- Keep image text short.
- Make CTA readable on mobile.
- Avoid too much body text inside the image.
- Do not crowd the logo.
- Use construction/project imagery only when it feels real and Qatar-relevant.

## 9. Instagram System

Profile:

- Official logo as profile image.
- Bio should explain project matching in one line.
- Link should point to `/start-here`.
- Highlights should use navy covers with teal icons.

Highlight categories:

- ابدأ هنا
- أصحاب المشاريع
- المقاولين
- الاستشاريين
- كيف يعمل
- تواصل

Post templates:

1. Project owner CTA post.
2. Contractor recruitment post.
3. Consultant recruitment post.
4. How it works carousel.
5. FAQ carousel.
6. Trust/process post.
7. Project category post.
8. WhatsApp/contact post.
9. Market insight post.
10. Testimonial/result post later.

Feed rules:

- 1080 x 1080 or 1080 x 1350.
- One idea per post.
- Large Arabic headline.
- 3-5 short text blocks maximum.
- CTA visible.
- Consistent brand colors.

Story rules:

- 1080 x 1920.
- Hook visible in first screen.
- CTA or sticker area near bottom.
- Keep safe margins for Instagram UI.

Carousel rules:

- Slide 1: hook.
- Slides 2-4: explanation or benefits.
- Final slide: CTA.
- No slide should look like a paragraph.

## 10. Flyer / Print / WhatsApp Image Rules

Flyers:

- Use A4 portrait for print.
- Use 1080 x 1350 for WhatsApp/social sharing.
- Keep QR code visible.
- Include logo, headline, three benefits, CTA, website/WhatsApp.

Project owner flyer:

- Headline: عندك مشروع وتحتاج مقاول؟
- CTA: امسح الكود وانشر مشروعك

Contractor flyer:

- Headline: مقاول في قطر؟
- CTA: سجّل لاستلام فرص مشاريع مناسبة

Consultant flyer:

- Headline: مكتب استشاري في قطر؟
- CTA: انضم كمكتب استشاري

Print rules:

- Do not use tiny text.
- Do not put long paragraphs.
- Do not use random construction backgrounds behind text.
- Use QR code with enough white space.

## 11. Image And Asset Rules

Good imagery:

- Qatar villas.
- Offices and shops under fit-out.
- MEP/HVAC work.
- Civil maintenance.
- Drawings and plans.
- Consultant/site supervision.
- Real construction details.

Avoid:

- Fake luxury stock photos.
- Western houses that look unrelated to Qatar.
- Overly dark blurred construction backgrounds.
- Random AI hands/tools that look fake.
- Cartoon workers.

## 12. Template Inventory

The design team should create these reusable templates:

Website:

- Hero section.
- Start-here choice cards.
- Step form layout.
- Trust benefits section.
- FAQ section.
- Contact section.

Meta ads:

- Project owner feed ad.
- Contractor feed ad.
- Consultant feed ad.
- Retargeting ad.
- Story version for each.

Instagram:

- Square post.
- Portrait post.
- Carousel cover.
- Carousel content slide.
- Story CTA.
- Reel cover.
- Highlight cover.

Print:

- A4 flyer.
- WhatsApp flyer.
- QR poster.

## 13. Approval Checklist

Before approving any design, check:

- Does it clearly look like MimaarLink?
- Does it use only official colors?
- Is Arabic readable on mobile?
- Is there one clear CTA?
- Is the official logo used correctly?
- Are icons consistent in size and style?
- Is the layout clean and not crowded?
- Is the copy short enough?
- Does it avoid overpromising?
- Does it feel Qatar/GCC professional?
- Would the target user understand it in three seconds?

If any answer is no, revise before publishing.
