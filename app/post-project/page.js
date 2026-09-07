'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AppShell from '@/components/AppShell';
import FormProgress from '@/components/FormProgress';
import DesktopFormAside from '@/components/DesktopFormAside';
import InlineFieldMessage from '@/components/InlineFieldMessage';
import { LazyFileUploadDropzone, LazyNativeSelect, LazyNetworkStatusNotice, LazySubmissionRetryNotice, LazySuccessPanel } from '@/components/LazyFormControls';
import { useLang } from '@/lib/LangContext';
import { PROJECT_CATEGORIES } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, X, Loader2, FileText, Layers, Wrench, Snowflake, HardHat, ClipboardCheck, MoreHorizontal, PencilLine } from 'lucide-react';
import { toast } from 'sonner';
import { getMarketingAttribution, trackMeta, trackMetaOnce } from '@/lib/marketingAttribution';
import { focusFormField } from '@/lib/focusFormField';

const PROJECT_CATEGORY_ICONS = {
  fitout: Layers,
  maintenance: Wrench,
  mep: Snowflake,
  civil: HardHat,
  consultancy: ClipboardCheck,
  other: MoreHorizontal,
};

const MAX_PROJECT_FILES = 5;

function SelectedCategorySummary({ category, t, onChange }) {
  const Icon = PROJECT_CATEGORY_ICONS[category] || MoreHorizontal;

  return (
    <section
      aria-label={t('selectedCategory')}
      className="project-category-summary mb-4 flex min-w-0 items-center gap-3 rounded-2xl border border-[#00B59E]/25 bg-[#D0F2EE]/35 p-3 shadow-soft dark:bg-[#00B59E]/10"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D0F2EE] dark:bg-[#00B59E]/15">
        <Icon className="h-5 w-5 text-teal" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 text-start">
        <span className="block text-[11px] font-bold leading-4 text-muted-foreground">{t('selectedCategory')}</span>
        <span className="mt-0.5 block break-words text-[14px] font-bold leading-5 text-navy">{t(`cat_${category}`)}</span>
      </span>
      <button
        type="button"
        onClick={onChange}
        aria-label={t('changeCategory')}
        className="tap-highlight inline-flex h-11 w-11 shrink-0 items-center justify-center gap-1.5 rounded-xl px-0 text-[13px] font-bold text-navy transition-colors hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B59E] focus-visible:ring-offset-2 min-[360px]:w-auto min-[360px]:px-3 dark:focus-visible:ring-offset-[#07111D]"
      >
        <PencilLine className="h-4 w-4" aria-hidden="true" />
        <span className="hidden min-[360px]:inline">{t('changeCategory')}</span>
      </button>
    </section>
  );
}

function PostProjectInner() {
  const { t, dir } = useLang();
  const sp = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [processingFiles, setProcessingFiles] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [createdId, setCreatedId] = useState(null);
  const [tried2, setTried2] = useState(false);
  const [tried3, setTried3] = useState(false);
  const [data, setData] = useState({
    category: '', location: '', description: '', timeline: '', budgetRange: '', files: [],
    name: '', company: '', phone: '+974 ', email: '', role: '', languagePreference: 'en',
  });

  const showStep = React.useCallback((nextStep) => {
    setStep(nextStep);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
  }, []);

  useEffect(() => {
    const cat = sp.get('category');
    if (cat && PROJECT_CATEGORIES.includes(cat)) {
      setData(d => ({ ...d, category: cat }));
      showStep(2);
    }
  }, [sp, showStep]);

  const markFormStarted = () => trackMetaOnce('project_form_start', 'FormStart', { form_type: 'project' }, { custom: true });
  const update = (k, v) => {
    markFormStarted();
    setData(d => ({ ...d, [k]: v }));
  };

  const submit = async () => {
    setTried3(true);
    const phoneDigits = (data.phone || '').replace(/^\+974\s*/, '').replace(/\D/g, '').length;
    if (!data.name || !data.phone || phoneDigits < 8) {
      focusFormField(!data.name ? 'project-name' : 'project-phone');
      return;
    }
    setSubmitError(false);
    setSubmitting(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, marketingAttribution: getMarketingAttribution() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error');
      trackMeta('Lead', { content_name: 'project_submission', form_type: 'project' });
      setCreatedId(json.project.id);
      setStep(4);
    } catch {
      setSubmitError(true);
      toast.error(t('actionFailed'));
    } finally { setSubmitting(false); }
  };

  return (
    <AppShell hideFooter hideNav wide>
      {step < 4 ? (
      <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <div className="project-form-flow min-w-0 w-full lg:max-w-2xl" data-form-step={step}>
          <h1 className="project-form-title display-title mb-1 break-words text-[24px] motion-fade-up sm:mb-1.5 sm:text-[30px]">{t('postTitle')}</h1>
          <p className="project-form-subtitle mb-3 break-words text-[13px] leading-relaxed text-muted-foreground sm:mb-4 sm:text-[13.5px]">{dir === 'rtl' ? 'أخبرنا بما تحتاجه. ابدأ باختيار نوع المشروع.' : 'Tell us what you need. Start with your project type.'}</p>
          <LazyNetworkStatusNotice />
          <FormProgress
            step={step}
            total={3}
            label={t('stepLabel')}
            title={step === 1 ? t('projectStep1Title') : step === 2 ? t('projectStep2Title') : t('projectStep3Title')}
            desc={step === 1 ? t('projectStep1Desc') : step === 2 ? t('projectStep2Desc') : t('projectStep3Desc')}
          />

          {step > 1 && data.category && (
            <SelectedCategorySummary category={data.category} t={t} onChange={() => showStep(1)} />
          )}

      {step === 1 && (
        <div>
          <Label className="text-sm font-semibold text-navy mb-3 block">{t('selectCategory')}</Label>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {PROJECT_CATEGORIES.map(c => {
              const Icon = PROJECT_CATEGORY_ICONS[c] || MoreHorizontal;
              const selected = data.category === c;
              return (
                <button key={c} type="button" onClick={() => { update('category', c); showStep(2); }} aria-pressed={selected}
                  className={`interactive-card tap-highlight min-h-[62px] min-w-0 rounded-2xl border px-4 py-3 text-start shadow-soft ${selected ? 'border-[#00B59E]/55 bg-[#D0F2EE]/45 dark:bg-[#00B59E]/15' : 'border-border bg-card hover:border-[#00B59E]/35 hover:bg-secondary/40'}`}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D0F2EE] dark:bg-[#00B59E]/15">
                      <Icon className="h-5 w-5 text-teal" />
                    </span>
                    <span className="min-w-0 flex-1 break-words text-[15px] font-bold leading-tight text-navy">{t(`cat_${c}`)}</span>
                    {selected && <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3.5">
          <div>
            <Label htmlFor="project-location" className="text-sm">
              {t('location')} <span className="ms-1 text-[12px] font-normal text-muted-foreground">({t('optional')})</span>
            </Label>
            <Input id="project-location" value={data.location} onChange={e => update('location', e.target.value)} placeholder={t('locationPh')} className="h-11 mt-1.5" />
          </div>
          <div>
            <Label htmlFor="project-description" className="text-sm">{t('description')} <span aria-hidden="true" className="ms-1 text-[#EF4444]">*</span></Label>
            <Textarea
              id="project-description"
              value={data.description}
              onChange={e => update('description', e.target.value)}
              placeholder={t('descriptionPh')}
              aria-invalid={tried2 && !data.description}
              aria-required="true"
              aria-describedby={tried2 && !data.description ? 'project-description-error' : undefined}
              className="mt-1.5 min-h-[110px]"
            />
            {tried2 && !data.description && <InlineFieldMessage id="project-description-error">{t('requireField')}</InlineFieldMessage>}
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <Label htmlFor="project-timeline" className="text-sm">{t('timeline')} <span className="ms-1 text-[12px] font-normal text-muted-foreground">({t('optional')})</span></Label>
              <Input id="project-timeline" value={data.timeline} onChange={e => update('timeline', e.target.value)} placeholder={t('timelinePh')} className="h-11 mt-1.5" />
            </div>
            <div>
              <Label htmlFor="project-budget" className="text-sm">{t('budget')} <span className="ms-1 text-[12px] font-normal text-muted-foreground">({t('optional')})</span></Label>
              <Input id="project-budget" value={data.budgetRange} onChange={e => update('budgetRange', e.target.value)} placeholder={t('budgetPh')} className="h-11 mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="project-files" className="text-sm">{t('uploadFilesLabel')} <span className="ms-1 text-[12px] font-normal text-muted-foreground">({t('optional')})</span></Label>
            <LazyFileUploadDropzone
              id="project-files"
              className="mt-1.5"
              label={data.files.length >= MAX_PROJECT_FILES ? `${data.files.length}/${MAX_PROJECT_FILES} ${t('files')}` : `${t('uploadFiles')} · ${data.files.length}/${MAX_PROJECT_FILES}`}
              hint={data.files.length >= MAX_PROJECT_FILES ? t('fileLimitReached') : t('uploadHint')}
              hasFiles={data.files.length > 0}
              busy={processingFiles}
              disabled={processingFiles || data.files.length >= MAX_PROJECT_FILES}
              selectedFiles={data.files}
              maxFiles={MAX_PROJECT_FILES}
              onBusyChange={setProcessingFiles}
              onFilesReady={(items) => {
                markFormStarted();
                setData(d => ({ ...d, files: [...d.files, ...items].slice(0, MAX_PROJECT_FILES) }));
              }}
              multiple
              accept="image/*,application/pdf"
            />
            {data.files.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {data.files.map((f, i) => (
                  <div key={i} className="flex min-h-11 items-center gap-2 rounded-xl border border-border/70 bg-secondary ps-3 pe-1 text-xs text-foreground">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="line-clamp-2 min-w-0 flex-1 break-words text-start leading-snug" dir="auto" title={f.name}>{f.name}</span>
                    <Button
                      type="button"
                      variant="destructiveGhost"
                      size="icon"
                      onClick={() => {
                        update('files', data.files.filter((_, j) => j !== i));
                        focusFormField('project-files');
                      }}
                      disabled={processingFiles}
                      className="shrink-0"
                      aria-label={`${t('removeFile')}: ${f.name}`}
                      title={t('removeFile')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2 pt-2 min-[280px]:grid-cols-2">
            <Button variant="outline" onClick={() => showStep(1)} disabled={processingFiles} className="h-auto min-h-11 w-full whitespace-normal py-2 text-center leading-snug cta-press">{t('back')}</Button>
            <Button variant="navy" onClick={() => { setTried2(true); if (data.description) showStep(3); else focusFormField('project-description'); }} disabled={processingFiles} className="h-auto min-h-11 w-full whitespace-normal py-2 text-center leading-snug cta-press">{t('next')}</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3.5">
          <h2 className="project-contact-heading text-base font-semibold text-navy">{t('contactDetails')}</h2>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <RequiredField id="project-name" label={t('name')} value={data.name} onChange={v => update('name', v)} tried={tried3} t={t} />
            <div>
              <Label htmlFor="project-company" className="text-sm">{t('company')} <span className="ms-1 text-[12px] font-normal text-muted-foreground">({t('optional')})</span></Label>
              <Input id="project-company" autoComplete="organization" value={data.company} onChange={e => update('company', e.target.value)} className="h-11 mt-1.5" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <RequiredField id="project-phone" label={t('phone')} value={data.phone} onChange={v => update('phone', v)} tried={tried3} t={t} placeholder="+974 ..." kind="phone" />
            <div>
              <Label htmlFor="project-email" className="text-sm">{t('email')} <span className="ms-1 text-[12px] font-normal text-muted-foreground">({t('optional')})</span></Label>
              <Input id="project-email" autoComplete="email" dir="ltr" value={data.email} onChange={e => update('email', e.target.value)} className="h-11 mt-1.5" type="email" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <Label htmlFor="project-role" className="text-sm">{t('role')} <span className="ms-1 text-[12px] font-normal text-muted-foreground">({t('optional')})</span></Label>
              <Input id="project-role" autoComplete="organization-title" value={data.role} onChange={e => update('role', e.target.value)} placeholder={t('rolePh')} className="h-11 mt-1.5" />
            </div>
            <div>
              <Label htmlFor="project-preferred-language" className="text-sm">{t('preferredLanguage')}</Label>
              <LazyNativeSelect
                id="project-preferred-language"
                value={data.languagePreference}
                onChange={e => update('languagePreference', e.target.value)}
                wrapperClassName="mt-1.5"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </LazyNativeSelect>
            </div>
          </div>
          {submitError && (
            <LazySubmissionRetryNotice id="project-submit-error" />
          )}
          <div className="grid grid-cols-1 gap-2 pt-2 min-[280px]:grid-cols-2">
            <Button variant="outline" onClick={() => showStep(2)} className="h-auto min-h-11 w-full whitespace-normal py-2 text-center leading-snug cta-press">{t('back')}</Button>
            <Button variant="navy" onClick={submit} disabled={submitting} aria-busy={submitting} aria-describedby={submitError ? 'project-submit-error' : undefined} className="h-auto min-h-11 w-full whitespace-normal py-2 text-center leading-snug cta-press">
              {submitting ? <><Loader2 className="animate-spin" aria-hidden="true" />{t('submitting')}</> : t('submit')}
            </Button>
          </div>
        </div>
      )}
        </div>
        <DesktopFormAside
          steps={[
            { title: t('projL_s1'), desc: t('projL_s1d') },
            { title: t('projL_s2'), desc: t('projL_s2d') },
            { title: t('projL_s3'), desc: t('projL_s3d') },
          ]}
          note={t('projL_privacy')}
        />
      </div>
      ) : (
        <LazySuccessPanel
          title={t('confirmation')}
          description={t('confirmationDesc')}
          referenceLabel={t('saveLink')}
          referencePath={`/project/${createdId}`}
          copyLabel={t('copyLink')}
          copiedLabel={t('linkCopied')}
          actionHref={`/project/${createdId}`}
          actionLabel={t('viewProject')}
        />
      )}
    </AppShell>
  );
}

function RequiredField({ id, label, value, onChange, tried, t, placeholder, inputMode, type, kind }) {
  const generatedId = React.useId();
  const fieldId = id || generatedId;
  const errorId = `${fieldId}-error`;
  const isPhone = kind === 'phone';
  const PREFIX = '+974';

  if (isPhone) {
    const localPart = (value || '').replace(/^\+974\s*/, '');
    const handleLocalChange = (raw) => {
      const cleaned = raw.replace(/[^\d\s-]/g, '');
      onChange(PREFIX + ' ' + cleaned);
    };
    const digitCount = localPart.replace(/\D/g, '').length;
    const empty = !localPart.trim();
    const tooShort = !empty && digitCount < 8;
    const showError = tried && (empty || tooShort);
    const errMsg = tooShort ? t('invalidPhone') : t('requireField');
    return (
      <div>
        <Label htmlFor={fieldId} className="text-sm">
          {label} <span aria-hidden="true" className="ms-1 text-[#EF4444]">*</span>
        </Label>
        <div dir="ltr" data-invalid={showError || undefined} className={`phone-field-shell mt-1.5 flex min-h-11 items-stretch overflow-hidden rounded-xl border bg-card shadow-soft transition-[border-color,box-shadow] ${showError ? 'border-[#EF4444] focus-within:ring-2 focus-within:ring-[#EF4444]/25' : 'border-input hover:border-[#00B59E]/45 focus-within:border-[#00B59E]/60 focus-within:ring-2 focus-within:ring-[#00B59E]/25'}`}>
          <div className="px-3 flex items-center bg-secondary text-navy text-sm font-semibold select-none border-e border-input shrink-0">
            {PREFIX}
          </div>
          <input
            id={fieldId}
            value={localPart}
            onChange={e => handleLocalChange(e.target.value)}
            inputMode="tel"
            aria-invalid={showError}
            aria-required="true"
            aria-describedby={showError ? errorId : undefined}
            className="min-w-0 flex-1 bg-transparent px-3 text-base outline-none md:text-sm [@media(pointer:coarse)]:!text-base"
          />
        </div>
        {showError && <InlineFieldMessage id={errorId}>{errMsg}</InlineFieldMessage>}
      </div>
    );
  }

  const showError = tried && !value;
  return (
    <div>
      <Label htmlFor={fieldId} className="text-sm">
        {label} <span aria-hidden="true" className="ms-1 text-[#EF4444]">*</span>
      </Label>
      <Input
        id={fieldId}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        type={type}
        aria-invalid={showError}
        aria-required="true"
        aria-describedby={showError ? errorId : undefined}
        className="mt-1.5 h-11"
      />
      {showError && <InlineFieldMessage id={errorId}>{t('requireField')}</InlineFieldMessage>}
    </div>
  );
}

export default function PostProjectPage() {
  const { t } = useLang();
  return (
    <Suspense fallback={<FormLoadingState title={t('loading')} />}>
      <PostProjectInner />
    </Suspense>
  );
}

function FormLoadingState({ title }) {
  return (
    <AppShell hideFooter hideNav wide>
      <div className="mx-auto flex min-h-[50dvh] w-full max-w-md items-center justify-center">
        <div role="status" className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-bold text-navy shadow-soft">
          <Loader2 className="h-5 w-5 animate-spin text-[#00B59E]" aria-hidden="true" />
          <span>{title}</span>
        </div>
      </div>
    </AppShell>
  );
}
