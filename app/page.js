'use client';
import React from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { useLang } from '@/lib/LangContext';
import { PROJECT_CATEGORIES } from '@/lib/i18n';
import { trackMeta } from '@/lib/marketingAttribution';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, MapPin, Layers, Wrench, Snowflake, HardHat, ClipboardCheck, MoreHorizontal, Hammer, FileText, Users, GitCompare } from 'lucide-react';

const CAT_ICONS = { fitout: Layers, maintenance: Wrench, mep: Snowflake, civil: HardHat, consultancy: ClipboardCheck, other: MoreHorizontal };
const COPY = {
  ar: {
    location: 'للمشاريع في قطر', title: 'مشروعك التالي.', emphasis: 'بداية أبسط.',
    intro: 'اربط مشروعك بالمقاولين والاستشاريين. أضف التفاصيل، واستقبل العروض، واختر الأنسب.',
    browse: 'أو اختر نوع مشروعك', picker: 'ماذا يحتاج مشروعك؟', pickerNote: 'اختر مجالاً للبدء',
    stepsTitle: 'من الفكرة إلى الاختيار', stepsNote: 'ثلاث خطوات واضحة.',
    steps: [['أضف مشروعك', 'اختر المجال وأخبرنا بما تحتاجه.'], ['استقبل العروض', 'تواصل مع مزوّدي الخدمة المناسبين.'], ['قارن واختر', 'راجع التفاصيل وحدد ما يناسب مشروعك.']],
    partners: 'للمقاولين والاستشاريين', partnersTitle: 'مكان لخبرتك.', partnersDesc: 'عرّفنا بشركتك والخدمات التي تقدمها في قطر.',
    contractor: 'شركة مقاولات', contractorDesc: 'التنفيذ والتجهيز والصيانة', consultant: 'مكتب استشاري', consultantDesc: 'التصميم والإشراف والاستشارات', join: 'سجّل شركتك',
    faqNote: 'إجابات مختصرة، قبل أن تبدأ.', ready: 'عندك مشروع في بالك؟', readyDesc: 'ابدأ بالتفاصيل الأساسية. نكمل من هناك.',
  },
  en: {
    location: 'For projects in Qatar', title: 'Your next project.', emphasis: 'A simpler start.',
    intro: 'Connect your project with contractors and consultants. Share the details, receive offers, and choose the right fit.',
    browse: 'Or choose a project type', picker: 'What does your project need?', pickerNote: 'Choose a category to get started',
    stepsTitle: 'From idea to the right fit', stepsNote: 'Three clear steps.',
    steps: [['Share your project', 'Choose a category and tell us what you need.'], ['Receive offers', 'Connect with suitable service providers.'], ['Compare and choose', 'Review the details and decide what fits.']],
    partners: 'For contractors & consultants', partnersTitle: 'A place for your expertise.', partnersDesc: 'Introduce your company and the services you offer in Qatar.',
    contractor: 'Contracting company', contractorDesc: 'Construction, fit-out & maintenance', consultant: 'Consultancy office', consultantDesc: 'Design, supervision & advisory', join: 'Register your company',
    faqNote: 'A few helpful answers before you start.', ready: 'Have a project in mind?', readyDesc: 'Start with the essentials. Take it from there.',
  },
};

export default function HomePage() {
  const { t, dir } = useLang();
  const copy = COPY[dir === 'rtl' ? 'ar' : 'en'];
  const arrowClass = `h-4 w-4 shrink-0 ${dir === 'rtl' ? 'rotate-180' : ''}`;
  return (
    <AppShell wide bleed flushFooter>
      <div className="studio-home">
        <section className="studio-hero-wrap container-x">
          <div className="studio-hero">
            <div className="studio-hero-copy">
              <p className="studio-location"><MapPin size={14} aria-hidden="true" />{copy.location}</p>
              <h1>{copy.title}<span>{copy.emphasis}</span></h1>
              <p className="studio-intro">{copy.intro}</p>
              <Link href="/post-project" className="btn btn-primary studio-primary">{t('postProject')}<ArrowRight className={arrowClass} aria-hidden="true" /></Link>
              <a href="#project-picker" className="studio-browse">{copy.browse}<span aria-hidden="true">↓</span></a>
            </div>
            <section id="project-picker" className="studio-picker" aria-labelledby="picker-title" tabIndex={-1}>
              <div className="studio-picker-top"><span className="studio-picker-symbol" aria-hidden="true"><Layers size={20} /></span><div><h2 id="picker-title">{copy.picker}</h2><p>{copy.pickerNote}</p></div></div>
              <div className="studio-category-grid">
                {PROJECT_CATEGORIES.map((category) => {
                  const Icon = CAT_ICONS[category];
                  return <Link className="studio-category" key={category} href={`/post-project?category=${category}`}><Icon size={23} aria-hidden="true" /><span>{t(`cat_${category}`)}</span><ArrowRight className={arrowClass} aria-hidden="true" /></Link>;
                })}
              </div>
            </section>
          </div>
        </section>

        <section className="studio-section container-x" aria-labelledby="steps-title">
          <div className="studio-section-heading"><h2 id="steps-title">{copy.stepsTitle}</h2><p>{copy.stepsNote}</p></div>
          <ol className="studio-steps">
            {copy.steps.map(([title, desc], index) => {
              const Icon = [FileText, Users, GitCompare][index];
              return <li key={title}><div className="studio-step-marker"><Icon size={21} aria-hidden="true" /><span aria-hidden="true">0{index + 1}</span></div><div><h3>{title}</h3><p>{desc}</p></div></li>;
            })}
          </ol>
        </section>

        <section className="container-x" aria-labelledby="partners-title">
          <div className="studio-partners">
            <div className="studio-partners-copy"><p className="studio-kicker">{copy.partners}</p><h2 id="partners-title">{copy.partnersTitle}</h2><p>{copy.partnersDesc}</p></div>
            <div className="studio-partner-links">
              {[{ href: '/contractor', pathType: 'contractor', title: copy.contractor, desc: copy.contractorDesc, Icon: Hammer }, { href: '/contractor?type=consultant', pathType: 'consultant', title: copy.consultant, desc: copy.consultantDesc, Icon: ClipboardCheck }].map(({ href, pathType, title, desc, Icon }) => <Link href={href} key={href} className="studio-partner" onClick={() => trackMeta('PathSelected', { path_type: pathType }, { custom: true })}><span className="studio-partner-icon"><Icon size={23} aria-hidden="true" /></span><span className="studio-partner-label"><strong>{title}</strong><span>{desc}</span><span className="studio-partner-action">{copy.join}</span></span><ArrowRight className={arrowClass} aria-hidden="true" /></Link>)}
            </div>
          </div>
        </section>

        <section className="studio-section studio-faq container-x" aria-labelledby="faq-title">
          <div className="studio-section-heading"><h2 id="faq-title">{t('faqTitle')}</h2><p>{copy.faqNote}</p></div>
          <Accordion type="single" collapsible className="studio-accordion">
            {[1, 2, 3, 4, 5].map((n) => <AccordionItem value={`faq-${n}`} key={n}><AccordionTrigger>{t(`faqQ${n}`)}</AccordionTrigger><AccordionContent>{t(`faqA${n}`)}</AccordionContent></AccordionItem>)}
          </Accordion>
        </section>

        <section className="container-x studio-final-wrap"><div className="studio-final"><div><h2>{copy.ready}</h2><p>{copy.readyDesc}</p></div><Link href="/post-project" className="btn btn-primary">{t('postProject')}<ArrowRight className={arrowClass} aria-hidden="true" /></Link></div></section>
      </div>
    </AppShell>
  );
}
