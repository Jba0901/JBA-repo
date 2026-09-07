'use client';
import React from 'react';

export default function FormProgress({ step, total, label, title, desc }) {
  return (
    <section className="form-progress form-progress-compact mb-5">
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-[12px] font-bold text-muted-foreground">{label} <bdi dir="ltr">{step} / {total}</bdi></span>
        <div className="form-progress-track flex flex-1 gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step} aria-label={`${label} ${step} / ${total}`} aria-valuetext={`${label} ${step} / ${total}: ${title}`}>
          {Array.from({ length: total }, (_, i) => <span key={i} className={`h-1 flex-1 rounded-full ${i < step ? 'bg-[#00B59E]' : 'bg-muted'}`} aria-hidden="true" />)}
        </div>
      </div>
      <h2 className="display-title mt-3 text-[19px] leading-snug sm:text-[22px]">{title}</h2>
      {desc && <p className="form-progress-description mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{desc}</p>}
    </section>
  );
}
