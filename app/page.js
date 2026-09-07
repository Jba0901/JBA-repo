'use client';
import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import AudiencePathCard from '@/components/AudiencePathCard';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import { useLang } from '@/lib/LangContext';
import { PROJECT_CATEGORIES } from '@/lib/i18n';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Cpu, GitCompare, MapPin, ArrowRight, ArrowUpRight, Building2,
  Layers, Wrench, Snowflake, HardHat, ClipboardCheck, MoreHorizontal,
  Hammer, ShieldCheck, CheckCircle2, FileText,
  TrendingUp, Landmark, BadgeCheck, Wallet, Scale
} from 'lucide-react';

const CAT_ICONS = {
  fitout: Layers, maintenance: Wrench, mep: Snowflake, civil: HardHat,
  consultancy: ClipboardCheck, other: MoreHorizontal,
};

export default function HomePage() {
  const { t, dir } = useLang();
  const isRTL = dir === 'rtl';
  const Arrow = () =>
    isRTL ? <ArrowRight className="btn-arrow w-4 h-4 rotate-180 shrink-0" /> : <ArrowRight className="btn-arrow w-4 h-4 shrink-0" />;

  const words = t('tagline').trim().split(' ');
  const lastWord = words.length > 1 ? words.pop() : null;

  return (
    <AppShell wide bleed flushFooter>
      {/* ============ HERO ============ */}
      <section className="home-hero">
        <div className="container-x relative z-10 pb-8 pt-6 sm:py-12 lg:py-16">
          <div className="grid min-w-0 items-center gap-7 sm:gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
            <div className="min-w-0">
              <div className="mb-4 inline-flex max-w-full min-w-0 items-center gap-2 text-[12px] font-bold leading-snug text-navy sm:mb-6 sm:text-[12.5px]">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="min-w-0 break-words">{t('heroBadge')}</span>
              </div>

              <h1 className="home-hero-title display-title break-words text-[30px] min-[390px]:text-[34px] sm:text-[44px] lg:text-[54px]">
                {words.join(' ')}{' '}
                {lastWord && <span className="home-hero-emphasis">{lastWord}</span>}
              </h1>

              <p className="mt-3.5 max-w-xl break-words text-[14px] leading-6 text-muted-foreground sm:mt-5 sm:text-[16px] sm:leading-relaxed">
                {t('subtitle')}
              </p>

              <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:gap-3">
                <Link href="/post-project" className="btn btn-primary min-h-[52px] px-7 text-[15px] sm:min-h-14">
                  {t('postProject')} <Arrow />
                </Link>
                <Link href="/contractor" className="btn btn-outline min-h-[52px] px-7 text-[14.5px] sm:min-h-14">
                  <Hammer className="w-4 h-4 shrink-0" />
                  {t('joinContractor')} <Arrow />
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 sm:mt-7 sm:gap-x-5">
                {[t('benefit_ai'), t('benefit_bids'), t('benefit_local')].map((b, i) => (
                  <span key={i} className="inline-flex min-w-0 items-center gap-1.5 text-[12.5px] font-semibold leading-snug text-muted-foreground sm:text-[13px]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#00B59E' }} />
                    <span className="min-w-0 break-words">{b}</span>
                  </span>
                ))}
              </div>
            </div>

            <ProjectStarter t={t} isRTL={isRTL} />
          </div>
        </div>
      </section>

      {/* ============ QATAR MARKET BAND (full-bleed navy) ============ */}
      <MarketBand t={t} />

      {/* ============ PROCESS STEPPER ============ */}
      <section className="py-10 sm:py-12 lg:py-20">
        <div className="container-x">
          <Reveal>
            <h2 className="mb-7 text-center display-title text-[26px] sm:mb-12 sm:text-[34px]">{t('howItWorks')}</h2>
          </Reveal>
          <div className="relative mx-auto max-w-5xl">
            <div className="hidden sm:block absolute top-8 inset-x-[16%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="grid gap-0 sm:grid-cols-3 sm:gap-6">
              {[
                { icon: FileText, title: t('step1Title').replace(/^[\d.\s٠-٩]+/, ''), desc: t('step1Desc') },
                { icon: Cpu, title: t('step2Title').replace(/^[\d.\s٠-٩]+/, ''), desc: t('step2Desc') },
                { icon: GitCompare, title: t('step3Title').replace(/^[\d.\s٠-٩]+/, ''), desc: t('step3Desc') },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 110}>
                  <div className={`relative flex gap-3.5 px-1 text-start sm:block sm:px-3 sm:text-center ${i < 2 ? 'pb-6 sm:pb-0' : ''}`}>
                    {i < 2 && <span className="absolute bottom-0 start-7 top-14 w-px bg-border sm:hidden" aria-hidden="true" />}
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-card sm:mx-auto sm:h-16 sm:w-16">
                      <s.icon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: '#00B59E' }} />
                      <span className="absolute -top-2 flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold text-white shadow-soft navy" style={{ insetInlineEnd: '-8px' }}>
                        {i + 1}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1 sm:pt-0">
                      <h3 className="text-[16px] font-bold leading-snug text-navy sm:mt-5 sm:text-[17px]">{s.title}</h3>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground sm:mx-auto sm:mt-2 sm:max-w-[260px]">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="py-10 sm:py-12 lg:py-16">
        <div className="container-x">
          <Reveal>
            <div className="mb-6 flex min-w-0 flex-col items-start gap-1 min-[390px]:flex-row min-[390px]:items-center min-[390px]:justify-between min-[390px]:gap-3 sm:mb-8">
              <h2 className="display-title min-w-0 break-words text-[26px] sm:text-[34px]">{t('serviceCategories')}</h2>
              <Link href="/post-project" className="inline-flex min-h-11 shrink-0 items-center gap-1 text-[13px] font-bold text-navy underline decoration-[#00B59E] decoration-2 underline-offset-4 tap-highlight">
                {t('seeAll')} <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-2.5 min-[390px]:gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {PROJECT_CATEGORIES.map((c, i) => {
              const Icon = CAT_ICONS[c] || MoreHorizontal;
              return (
                <Reveal key={c} delay={Math.min(i * 60, 360)} className="h-full">
                  <Link
                    href={`/post-project?category=${c}`}
                    className="group block h-full rounded-[20px] tap-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B59E] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07111D]"
                  >
                    <div className="interactive-card flex h-full min-h-[116px] min-w-0 flex-col items-center justify-center gap-3 rounded-[20px] border border-border bg-card p-3.5 shadow-soft group-hover:border-[#00B59E]/45 min-[390px]:min-h-[124px] min-[390px]:gap-3.5 min-[390px]:p-4 sm:p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl min-[390px]:h-12 min-[390px]:w-12" style={{ background: 'rgba(0,181,158,0.10)' }}>
                        <Icon className="h-[22px] w-[22px] min-[390px]:h-6 min-[390px]:w-6" style={{ color: '#00B59E' }} aria-hidden="true" />
                      </div>
                      <span className="min-w-0 break-words text-center text-[12.5px] font-bold leading-5 text-navy">{t(`cat_${c}`)}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHY MIMAARLINK (tinted band) ============ */}
      <section className="surface-band py-10 sm:py-12 lg:py-20">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-11">
              <h2 className="display-title text-[26px] sm:text-[34px]">{t('whyTitle')}</h2>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{t('whySubtitle')}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {[
              { icon: BadgeCheck, title: t('why1Title'), desc: t('why1Desc') },
              { icon: Wallet, title: t('why2Title'), desc: t('why2Desc') },
              { icon: Scale, title: t('why3Title'), desc: t('why3Desc') },
              { icon: MapPin, title: t('why4Title'), desc: t('why4Desc') },
            ].map((w, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="interactive-card flex h-full items-start gap-3 rounded-[20px] border border-border bg-card p-3.5 shadow-soft hover:border-[#00B59E]/40 min-[390px]:gap-3.5 min-[390px]:p-4 sm:block sm:rounded-[22px] sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:mb-5 sm:h-12 sm:w-12" style={{ background: 'rgba(0,181,158,0.10)' }}>
                    <w.icon className="h-[22px] w-[22px]" style={{ color: '#00B59E' }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15.5px] font-bold leading-snug text-navy sm:text-[16px]">{w.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:mt-2">{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AUDIENCE — three clear paths ============ */}
      <section className="py-12 sm:py-14 lg:py-20">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-11">
              <div className="eyebrow justify-center mb-3">{t('startEyebrow')}</div>
              <h2 className="display-title text-[26px] sm:text-[34px]">{t('startTitle')}</h2>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{t('startSubtitle')}</p>
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { href: '/post-project', icon: Building2, eyebrow: t('startProjectEyebrow'), title: t('startProjectTitle'), desc: t('startProjectDesc'), cta: t('startProjectCta'), tone: 'teal' },
              { href: '/contractor', icon: Hammer, eyebrow: t('startContractorEyebrow'), title: t('startContractorTitle'), desc: t('startContractorDesc'), cta: t('startContractorCta'), tone: 'amber' },
              { href: '/contractor?type=consultant', icon: ClipboardCheck, eyebrow: t('startConsultantEyebrow'), title: t('startConsultantTitle'), desc: t('startConsultantDesc'), cta: t('startConsultantCta'), tone: 'navy' },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <AudiencePathCard
                  {...r}
                  pathType={i === 0 ? 'project' : i === 1 ? 'contractor' : 'consultant'}
                  detailed
                  primary={i === 0}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <FaqSection t={t} />

      {/* ============ FINAL CTA (teal band) ============ */}
      <section className="launch-cta-band">
        <div className="container-x py-10 text-center text-white sm:py-16 lg:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[26px] font-extrabold leading-snug sm:text-[40px] sm:leading-tight">{t('projL_finalTitle')}</h2>
            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-6 text-white/85 sm:mt-4 sm:text-[16px]">{t('projL_finalSub')}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row">
              <Link href="/post-project" className="btn px-8 text-[15px]" style={{ minHeight: 54, background: '#fff', color: '#152B54' }}>
                {t('postProject')} <Arrow />
              </Link>
              <Link href="/contractor" className="btn btn-ghost-light px-7 text-[14px]" style={{ minHeight: 54 }}>
                <Hammer className="w-4 h-4 shrink-0" />
                {t('joinContractor')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </AppShell>
  );
}

function MarketBand({ t }) {
  const stats = [
    { value: t('marketStat1Value'), label: t('marketStat1Label'), icon: Landmark, animate: true },
    { value: '10%+', label: t('marketStat2Label'), icon: TrendingUp, animate: true },
    { value: t('marketVisionValue'), label: t('marketVisionLabel'), icon: ShieldCheck, animate: false },
  ];
  return (
    <section className="premium-panel market-skyline-panel text-white">
      <div className="container-x relative z-10 py-8 sm:py-14 lg:py-20">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold" style={{ color: '#00B59E' }}>
                <Landmark className="h-3.5 w-3.5 shrink-0" />
                {t('contactLocationValue')}
              </div>
              <h2 className="text-[26px] font-extrabold leading-snug sm:text-[36px] sm:leading-tight">{t('marketTitle')}</h2>
              <p className="mt-3 text-[13.5px] leading-6 text-white/75 sm:mt-4 sm:text-[15px] sm:leading-relaxed">{t('marketSubtitle')}</p>
              <p className="mt-4 text-[12px] leading-5 text-white/60">{t('marketSource')}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 130} className="h-full">
                <div className="stat-card card-sheen flex h-full items-center gap-3 rounded-[18px] p-3.5 min-[390px]:gap-3.5 min-[390px]:p-4 sm:block sm:rounded-2xl sm:p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <s.icon className="h-[19px] w-[19px]" style={{ color: '#00B59E' }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    {s.animate
                      ? <CountUp value={s.value} staticBelow={641} className="block text-[27px] font-black leading-none text-white sm:mt-4 sm:text-[32px]" />
                      : <span className="block text-[27px] font-black leading-none text-white sm:mt-4 sm:text-[32px]"><bdi dir="ltr">{s.value}</bdi></span>}
                    <p className="mt-1.5 text-[12px] leading-5 text-white/70 sm:mt-2.5 sm:leading-relaxed">{s.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ t }) {
  const items = [1, 2, 3, 4, 5].map((n) => ({ q: t(`faqQ${n}`), a: t(`faqA${n}`) }));
  return (
    <section className="py-12 sm:py-14 lg:py-20">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-10">
            <h2 className="display-title text-[26px] sm:text-[34px]">{t('faqTitle')}</h2>
            <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{t('faqSubtitle')}</p>
          </div>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible defaultValue="faq-0" className="mx-auto grid max-w-3xl gap-2.5">
            {items.map((it, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{it.q}</AccordionTrigger>
                <AccordionContent>{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectStarter({ t, isRTL }) {
  return (
    <section className="project-starter w-full min-w-0 overflow-hidden rounded-[24px] border border-border bg-card shadow-card sm:mx-auto sm:max-w-xl lg:rounded-[28px]" aria-labelledby="project-starter-title">
      <div className="project-starter-heading relative overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-1.5 text-[11px] font-bold text-[#D0F2EE]">{t('postProject')}</div>
            <h2 id="project-starter-title" className="text-[18px] font-extrabold leading-snug text-white sm:text-[22px]">{t('projectStep1Title')}</h2>
          </div>
          <span className="shrink-0 rounded-xl border border-white/20 px-2.5 py-2 text-[11px] font-bold text-white" dir="ltr" aria-hidden="true">01 / 03</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 sm:gap-2.5 sm:p-4">
        {PROJECT_CATEGORIES.map((category) => {
          const Icon = CAT_ICONS[category] || MoreHorizontal;
          return (
            <Link key={category} href={`/post-project?category=${category}`} className="starter-category group flex min-h-[80px] min-w-0 items-center gap-2 rounded-2xl border border-border px-2.5 py-3 text-navy tap-highlight sm:min-h-[90px] sm:gap-3 sm:px-3">
              <span className="starter-category-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10" aria-hidden="true"><Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" /></span>
              <span className="min-w-0 flex-1 break-words text-[12px] font-bold leading-5 sm:text-[13px]">{t(`cat_${category}`)}</span>
              <ArrowRight className={`hidden h-3.5 w-3.5 shrink-0 opacity-50 sm:block ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
            </Link>
          );
        })}
      </div>
      <p className="border-t border-border px-4 py-3 text-[12px] leading-5 text-muted-foreground sm:px-6">{t('projectStep1Desc')}</p>
    </section>
  );
}
