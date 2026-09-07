'use client';
import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import Reveal from '@/components/Reveal';
import { useLang } from '@/lib/LangContext';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function MarketingLanding({
  eyebrow,
  tagline,
  subtitle,
  ctaLabel,
  ctaHref,
  ctaSubtext,
  benefits,
  popularTypesTitle,
  popularTypes,
  steps,
  privacyLine,
  finalTitle,
  finalSub,
  tone = 'teal',
}) {
  const { dir, t } = useLang();
  const isRTL = dir === 'rtl';
  const isAmber = tone === 'amber';
  const accentColor = isAmber ? '#FFB638' : '#00B59E';
  const accentSoft = isAmber ? 'rgba(255,182,56,0.14)' : 'rgba(0,181,158,0.10)';
  const ctaClass = isAmber ? 'btn-amber' : 'btn-primary';
  const ctaStyle = { minHeight: 52, color: isAmber ? '#152B54' : '#0D1B2A' };
  const Arrow = () =>
    isRTL
      ? <ArrowRight className="h-4 w-4 shrink-0 rotate-180" aria-hidden="true" />
      : <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />;

  const words = (tagline || '').trim().split(/\s+/).filter(Boolean);
  const accentWordCount = words.length > 2 ? 2 : 1;
  const accentWords = words.splice(-accentWordCount);

  return (
    <AppShell hideNav wide>
      <div className="landing-ambient v2-ambient -mx-4 px-4 sm:-mx-6 sm:px-6">
        {/* ============ HERO ============ */}
        <section className="landing-hero relative z-10 pb-8 pt-3 text-center sm:pb-10 sm:pt-6 lg:pb-12 lg:pt-14">
          <div className="mx-auto max-w-2xl">
            {eyebrow && (
              <div
                className="landing-hero-eyebrow mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-bold text-navy sm:mb-5"
                style={{ borderColor: `${accentColor}40`, background: accentSoft }}
              >
                {eyebrow}
              </div>
            )}
            <h1 className="landing-hero-title display-title mx-auto max-w-[23rem] text-[30px] sm:max-w-2xl sm:text-[42px] lg:text-[46px]">
              {words.join(' ')}{' '}
              <span className="home-hero-emphasis" style={{ textDecorationColor: accentColor }}>{accentWords.join(' ')}</span>
            </h1>
            <p className="landing-hero-subtitle mx-auto mt-3.5 max-w-lg text-[14.5px] leading-7 text-muted-foreground sm:mt-4 sm:text-[15px] sm:leading-relaxed">
              {subtitle}
            </p>
            <div className="landing-hero-action mt-6 sm:mt-7">
              <Link href={ctaHref} className={`btn ${ctaClass} soft-shine w-full px-9 text-[15px] sm:w-auto`} style={ctaStyle}>
                {ctaLabel} <Arrow />
              </Link>
              {ctaSubtext && <p className="landing-hero-subtext mt-3 text-[12.5px] text-muted-foreground/80">{ctaSubtext}</p>}
            </div>
          </div>
        </section>
      </div>

      {/* ============ BENEFITS (accent-bordered cards) ============ */}
      <section className="py-6 sm:py-8 lg:py-10">
        <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3.5">
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 110} className="h-full">
              <div className="landing-benefit-card interactive-card flex h-full items-start gap-3 rounded-[20px] border border-border bg-card p-3.5 shadow-soft min-[390px]:gap-3.5 min-[390px]:p-4 sm:block sm:rounded-3xl sm:p-6" style={{ borderInlineStartWidth: 3, borderInlineStartColor: accentColor }}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:mb-4 sm:h-12 sm:w-12" style={{ background: accentSoft }}>
                  <b.icon
                    className={`h-[22px] w-[22px] ${isAmber ? 'text-[#152B54] dark:text-[#FFB638]' : 'text-[#00B59E]'}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="landing-benefit-copy min-w-0 flex-1">
                  <h3 className="text-[15.5px] font-bold leading-snug text-navy sm:text-[16px]">{b.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:mt-1.5">{b.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ POPULAR PROJECT TYPES ============ */}
      {popularTypes && popularTypes.length > 0 && (
        <section className="py-6 sm:py-8 lg:py-10">
          <Reveal>
            <h2 className="display-title mb-5 text-center text-[22px] sm:mb-7 sm:text-[26px]">{popularTypesTitle}</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-2.5">
              {popularTypes.map((p, i) => (
                <span
                  key={i}
                  className="flex min-h-11 min-w-0 items-center justify-center break-words rounded-xl border border-border bg-secondary/70 px-2.5 py-2 text-center text-[12.5px] font-semibold leading-5 text-navy min-[390px]:rounded-2xl min-[390px]:px-3 sm:min-h-0 sm:rounded-full sm:px-4 sm:text-[13px]"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ HOW IT WORKS (stepper) ============ */}
      <section className="py-6 sm:py-8 lg:py-10">
        <Reveal>
          <h2 className="mb-7 text-center display-title text-[24px] sm:mb-9 sm:text-[30px]">{t('howItWorks')}</h2>
        </Reveal>
        <div className="relative">
          <div className="hidden sm:block absolute top-7 inset-x-[16%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="grid gap-0 sm:grid-cols-3 sm:gap-3">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 110}>
                <div className={`relative flex gap-3 px-0.5 text-start sm:block sm:px-3 sm:text-center ${i < steps.length - 1 ? 'pb-5 sm:pb-0' : ''}`}>
                  {i < steps.length - 1 && <span className="absolute bottom-0 start-[22px] top-11 w-px bg-border sm:hidden" aria-hidden="true" />}
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-card sm:mx-auto sm:h-14 sm:w-14">
                    <span className="text-[16px] font-extrabold text-navy sm:text-[18px]">{i + 1}</span>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5 sm:pt-0">
                    <h3 className="text-[16px] font-bold leading-snug text-navy sm:mt-4">{s.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:mx-auto sm:mt-1.5 sm:max-w-[240px]">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {privacyLine && (
          <Reveal delay={150}>
            <div className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2.5 rounded-2xl border border-[#00B59E]/20 bg-[#D0F2EE]/40 px-3.5 py-3 dark:bg-[#00B59E]/10 sm:mt-7">
              <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: '#00B59E' }} aria-hidden="true" />
              <p className="text-center text-[12.5px] leading-relaxed text-muted-foreground">{privacyLine}</p>
            </div>
          </Reveal>
        )}
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="pb-0 pt-6 sm:pt-8 lg:pt-12">
        <Reveal>
          <div className="premium-panel glass-line relative overflow-hidden rounded-[22px] px-4 py-7 text-center text-white shadow-card min-[390px]:rounded-[24px] min-[390px]:px-5 sm:rounded-[28px] sm:px-10 sm:py-12">
            <div className="relative mx-auto max-w-xl">
              <h3 className="text-[22px] font-extrabold leading-snug sm:text-[30px] sm:leading-tight">{finalTitle}</h3>
              <p className="mb-5 mt-2.5 text-[13.5px] leading-6 text-white/75 sm:mb-7 sm:text-[14px]">{finalSub}</p>
              <Link href={ctaHref} className={`btn ${ctaClass} soft-shine w-full px-9 text-[15px] sm:w-auto`} style={ctaStyle}>
                {ctaLabel} <Arrow />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </AppShell>
  );
}
