'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/LangContext';
import { trackMeta } from '@/lib/marketingAttribution';

export default function AudiencePathCard({
  href,
  icon: Icon,
  title,
  desc,
  tone,
  pathType,
  eyebrow,
  cta,
  detailed = false,
  primary = false,
}) {
  const { dir } = useLang();
  const Arrow = () => (
    <span className="cta-arrow inline-flex shrink-0" aria-hidden="true">
      <ArrowRight className={`h-4 w-4${dir === 'rtl' ? ' rotate-180' : ''}`} />
    </span>
  );

  return (
    <Link
      href={href}
      onClick={() => trackMeta('PathSelected', { path_type: pathType }, { custom: true })}
      className={`group block h-full tap-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B59E] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#07111D] ${detailed ? 'rounded-[22px] md:rounded-[26px]' : 'rounded-[20px] sm:rounded-[22px]'}`}
    >
      {detailed ? (
        <article
          className="path-card interactive-card card-sheen relative flex h-full flex-col overflow-hidden rounded-[22px] border border-t-[3px] p-4 shadow-soft sm:p-5 md:rounded-[26px] md:p-7"
          data-tone={tone}
          data-primary={primary ? 'true' : undefined}
          style={{ borderTopColor: 'var(--path-accent)' }}
        >
          <div className="flex min-w-0 items-center gap-3.5 md:block">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 md:h-14 md:w-14 md:group-hover:scale-110 md:group-hover:-rotate-3"
              style={{ background: 'var(--path-accent-soft)', color: 'var(--path-accent)' }}
              aria-hidden="true"
            >
              <Icon className="h-6 w-6 md:h-7 md:w-7" />
            </span>
            <div className="min-w-0 flex-1 md:mt-5">
              {eyebrow && (
                <div className="path-card-eyebrow text-[12px] font-bold leading-5 ltr:uppercase ltr:tracking-wide">
                  {eyebrow}
                </div>
              )}
              <h3 className="mt-0.5 text-[18px] font-extrabold leading-snug text-navy md:mt-1.5 md:text-[22px] md:leading-tight">
                {title}
              </h3>
            </div>
          </div>
          <p className="mt-3 flex-1 text-[13px] leading-6 text-muted-foreground md:mt-2.5 md:text-[13.5px] md:leading-relaxed">
            {desc}
          </p>
          <span className="path-card-action relative z-10 mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl px-4 text-[13.5px] font-bold md:mt-6 md:min-h-[50px] md:text-[14px]">
            {cta}
            <Arrow />
          </span>
          <Icon
            className="pointer-events-none absolute bottom-[-22px] hidden h-28 w-28 select-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 md:block"
            style={{ color: 'var(--path-accent-soft)', insetInlineEnd: '-10px' }}
            aria-hidden="true"
          />
        </article>
      ) : (
        <article
          className="path-card interactive-card relative flex h-full min-h-[104px] items-center gap-3 rounded-[20px] border p-3.5 shadow-soft sm:min-h-0 sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-[22px] sm:p-5"
          data-tone={tone}
        >
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-[52px] sm:w-[52px] sm:rounded-[18px]"
            style={{ background: 'var(--path-accent-soft)', color: 'var(--path-accent)' }}
            aria-hidden="true"
          >
            <Icon className="h-[22px] w-[22px] sm:h-[23px] sm:w-[23px]" />
          </span>
          <div className="min-w-0 flex-1 sm:mt-4">
            <h2 className="text-[16px] font-extrabold leading-tight text-navy sm:text-[17px]">{title}</h2>
            <p className="mt-1 text-[12.5px] leading-5 text-muted-foreground sm:mt-1.5 sm:leading-relaxed">{desc}</p>
            {cta && (
              <span className="mt-2 inline-flex max-w-full items-center gap-2 text-start text-[12px] font-bold leading-snug text-navy underline decoration-[#00B59E] underline-offset-4 sm:mt-4 sm:text-[13px]">
                <span className="min-w-0 break-words">{cta}</span>
                <Arrow />
              </span>
            )}
          </div>
          {!cta && (
            <span
              className="path-card-compact-action flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-soft transition-transform duration-200 group-hover:scale-105 sm:absolute sm:top-5"
              style={{ background: 'var(--path-accent)', insetInlineEnd: '1.25rem' }}
              aria-hidden="true"
            >
              <Arrow />
            </span>
          )}
        </article>
      )}
    </Link>
  );
}
