'use client';
import React from 'react';
import AppShell from '@/components/AppShell';
import AudiencePathCard from '@/components/AudiencePathCard';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { useLang } from '@/lib/LangContext';
import { Building2, ClipboardCheck, Hammer } from 'lucide-react';
import { trackMeta } from '@/lib/marketingAttribution';

export default function StartHerePage() {
  const { t } = useLang();

  return (
    <AppShell hideNav hideFooter wide>
      <div className="start-here-ambient v2-ambient -mx-4 flex min-h-[calc(100svh-120px)] flex-col justify-center px-4 py-5 sm:-mx-6 sm:min-h-[calc(100dvh-130px)] sm:px-6 sm:py-8">
        <div className="relative z-10 mx-auto w-full max-w-md sm:max-w-3xl lg:max-w-4xl">
          <div className="start-here-intro mb-5 text-center sm:mb-8">
            <div className="eyebrow mb-2.5 justify-center sm:mb-3">{t('startEyebrow')}</div>
            <h1 className="display-title text-[30px] sm:text-[36px]">{t('startTitle')}</h1>
            <p className="mx-auto mt-2.5 max-w-[420px] text-[13.5px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-[14.5px]">
              {t('startSubtitle')}
            </p>
          </div>

          <div className="start-here-grid grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            <AudiencePathCard
              href="/post-project"
              icon={Building2}
              title={t('startProjectTitle')}
              desc={t('startProjectDesc')}
              cta={t('startProjectCta')}
              tone="teal"
              pathType="project"
              primary
            />
            <AudiencePathCard
              href="/contractor"
              icon={Hammer}
              title={t('startContractorTitle')}
              desc={t('startContractorDesc')}
              cta={t('startContractorCta')}
              tone="amber"
              pathType="contractor"
            />
            <AudiencePathCard
              href="/contractor?type=consultant"
              icon={ClipboardCheck}
              title={t('startConsultantTitle')}
              desc={t('startConsultantDesc')}
              cta={t('startConsultantCta')}
              tone="navy"
              pathType="consultant"
            />
          </div>

          <div className="start-here-help mt-5 text-center sm:mt-7">
            <p className="mb-2 text-[12.5px] font-medium text-muted-foreground sm:mb-2.5">{t('startHelpTitle')}</p>
            <a
              href="https://wa.me/97466259219"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackMeta('Contact', { contact_method: 'whatsapp' })}
              className="btn btn-outline px-5 text-[13px]"
              style={{ minHeight: 44 }}
            >
              <WhatsAppIcon className="h-[15px] w-[15px]" style={{ color: '#00B59E' }} />
              {t('startWhatsapp')}
            </a>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
