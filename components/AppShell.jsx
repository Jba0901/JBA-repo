'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLang } from '@/lib/LangContext';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  FilePlus,
  Globe,
  Hammer,
  Home,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sparkles,
  Sun,
  Users,
  X,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import MarketingAttribution from '@/components/MarketingAttribution';

function Logo({ className = 'h-8 w-8 sm:h-9 sm:w-9', priority = false }) {
  return (
    <span className={`brand-mark ${className} shrink-0`} aria-hidden="true">
      <Image
        src="/logo.png"
        alt=""
        width={860}
        height={830}
        sizes="(min-width: 640px) 40px, 32px"
        quality={100}
        priority={priority}
      />
    </span>
  );
}

function BrandText({ size = 17, onDark = false }) {
  const { t, lang } = useLang();
  const first = onDark ? '#FFFFFF' : '#152B54';
  const second = '#00B59E';
  if (lang === 'ar') {
    const parts = t('appName').split(' ');
    return (
      <span className="font-extrabold leading-tight whitespace-nowrap" style={{ fontSize: size }}>
        <span style={{ color: first }}>{parts[0]}</span>
        {parts[1] && <span style={{ color: second }} className="ms-1">{parts[1]}</span>}
      </span>
    );
  }
  return (
    <span className="font-extrabold leading-tight tracking-tight whitespace-nowrap" style={{ fontSize: size }}>
      <span style={{ color: first }}>Mimaar</span>
      <span style={{ color: second }}>Link</span>
    </span>
  );
}

export default function AppShell({ children, hideNav = false, hideFooter = false, flushFooter = false, wide = false, bleed = false }) {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const [navigationSearch, setNavigationSearch] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [themeReady, setThemeReady] = useState(false);
  const menuButtonRef = useRef(null);
  const menuCloseButtonRef = useRef(null);
  const menuWasOpenRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let stored;
    try { stored = localStorage.getItem('mlTheme'); } catch {}
    const initial = stored === 'dark' || stored === 'light' ? stored : 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady || typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try { localStorage.setItem('mlTheme', theme); } catch {}
  }, [theme, themeReady]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      menuWasOpenRef.current = true;
      const focusFrame = window.requestAnimationFrame(() => menuCloseButtonRef.current?.focus());
      return () => window.cancelAnimationFrame(focusFrame);
    }

    if (menuWasOpenRef.current) {
      menuWasOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  const container = wide ? 'max-w-7xl' : 'max-w-3xl';
  const copy = getShellCopy(lang);
  const isDark = theme === 'dark';
  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <div className="app-viewport flex flex-col">
      <a
        href="#main-content"
        className="fixed start-4 top-3 z-[120] -translate-y-24 rounded-xl bg-[#152B54] px-4 py-3 text-sm font-bold text-white shadow-lift focus-visible:translate-y-0"
      >
        {copy.skipToContent}
      </a>
      <header
        className={`site-header sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'is-scrolled backdrop-blur-xl border-b border-border shadow-soft'
            : 'backdrop-blur-xl border-b border-transparent'
        }`}
      >
        <div className="container-x relative h-16 sm:h-[68px] flex items-center justify-between gap-2">
          <Link href="/" aria-label={t('appName')} className="flex min-h-11 min-w-11 items-center gap-2 rounded-xl sm:gap-2.5 shrink tap-highlight">
            <Logo className="h-8 w-8 sm:h-10 sm:w-10" priority />
            <span className="max-[263px]:hidden"><BrandText size={17} onDark={isDark} /></span>
          </Link>

          {/* centered desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <HeaderLink href="/" label={t('home')} navigationSearch={navigationSearch} />
            <HeaderLink href="/start-here" label={t('startEyebrow')} navigationSearch={navigationSearch} />
            <HeaderLink href="/post-project" label={copy.projectNav} ariaLabel={t('postProject')} navigationSearch={navigationSearch} />
            <HeaderLink href="/contractor" label={t('providerTypeContractor')} navigationSearch={navigationSearch} />
            <HeaderLink href="/contractor?type=consultant" label={copy.consultantNav} ariaLabel={t('providerTypeConsultant')} navigationSearch={navigationSearch} />
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex">
              <ThemeToggle theme={theme} onToggle={toggleTheme} copy={copy} />
            </span>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="btn btn-outline h-11 w-11 px-0 text-[13px] min-[360px]:w-auto min-[360px]:px-3.5"
              aria-label={copy.switchLanguage}
              title={copy.switchLanguage}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span className="hidden min-[360px]:inline">{t('language')}</span>
            </button>
            <button
              ref={menuButtonRef}
              onClick={() => setMenuOpen(true)}
              className="btn btn-outline h-11 w-11 px-0"
              aria-label={copy.openMenu}
              aria-expanded={menuOpen}
              aria-controls="site-menu-drawer"
            >
              <Menu className="w-5 h-5 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      <MenuDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        copy={copy}
        t={t}
        theme={theme}
        isDark={isDark}
        rtl={lang === 'ar'}
        onThemeToggle={toggleTheme}
        closeButtonRef={menuCloseButtonRef}
        navigationSearch={navigationSearch}
      />

      <main id="main-content" tabIndex={-1} className={`mobile-nav-main scroll-mt-20 flex-1 w-full ${hideFooter ? (hideNav ? 'pb-10' : 'pb-32 lg:pb-12') : 'pb-0'}`}>
        <Suspense fallback={null}>
          <NavigationSearchSync onChange={setNavigationSearch} />
          <MarketingAttribution />
        </Suspense>
        {bleed ? (
          children
        ) : (
          <div className={`${container} app-content-x mx-auto py-4`}>{children}</div>
        )}
        {!hideFooter && <SiteFooter flush={flushFooter} reserveMobileNav={!hideNav} />}
      </main>

      {!hideNav && (
        <nav className="mobile-bottom-nav safe-pad-bottom fixed bottom-3 left-1/2 z-40 w-[min(94vw,360px)] -translate-x-1/2 lg:hidden" aria-label={copy.quickTitle}>
          <div className="grid grid-cols-3 gap-1 rounded-[22px] border border-border bg-white/95 p-1.5 shadow-lift backdrop-blur-xl dark:bg-[#0D1B2A]/95">
            <NavBtn href="/" icon={Home} label={t('home')} matches={['/']} />
            <NavBtn href="/post-project" icon={FilePlus} label={copy.projectNav} ariaLabel={t('postProject')} matches={['/post-project', '/for-projects']} />
            <NavBtn href="/contractor" icon={Hammer} label={copy.providerNav} ariaLabel={t('joinContractor')} matches={['/contractor', '/consultant', '/for-contractors']} />
          </div>
        </nav>
      )}
    </div>
  );
}

// Keep query subscriptions inside a small boundary, not around the visible shell.
function NavigationSearchSync({ onChange }) {
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  useEffect(() => { onChange(search); }, [search, onChange]);
  return null;
}

function isNavigationActive(href, pathname, search) {
  const [targetPath, targetQuery = ''] = href.split('?');
  if (pathname !== targetPath) return false;
  if (targetPath !== '/contractor') return true;
  if (search === null) return false;

  const targetIsConsultant = new URLSearchParams(targetQuery).get('type') === 'consultant';
  const currentIsConsultant = new URLSearchParams(search).get('type') === 'consultant';
  return targetIsConsultant === currentIsConsultant;
}

function getShellCopy(lang) {
  if (lang === 'ar') {
    return {
      menu: 'القائمة',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      theme: 'المظهر',
      lightMode: 'الوضع الفاتح',
      darkMode: 'الوضع الليلي',
      themeHint: 'تبديل المظهر',
      start: 'ابدأ هنا',
      startDesc: 'اختر هل لديك مشروع أو تريد الانضمام كمقدم خدمة.',
      homeDesc: 'الصفحة الرئيسية والخدمات.',
      projectDesc: 'أرسل تفاصيل المشروع ليتم مراجعته ومطابقته.',
      contractorDesc: 'انضم كمقاول لاستلام فرص مشاريع مناسبة.',
      consultantDesc: 'انضم كمكتب استشاري لاستلام فرص تصميم وإشراف.',
      projectOwnersDesc: 'شرح مختصر لأصحاب المشاريع.',
      contractorsDesc: 'شرح مختصر للمقاولين.',
      contact: 'تواصل معنا',
      contactDesc: 'واتساب، إنستغرام، البريد، والهاتف.',
      primary: 'انشر مشروعك',
      secondary: 'انضم كمقدم خدمة',
      social: 'قنوات التواصل',
      quickTitle: 'اختر المسار',
      quickSubtitle: 'ابدأ من الخيار الأقرب لك.',
      projectNav: 'مشروع جديد',
      providerNav: 'مقدم خدمة',
      consultantNav: 'مكتب استشاري',
      moreLinks: 'روابط سريعة',
      allPaths: 'كل المسارات',
      appearance: 'المظهر',
      switchLanguage: 'تبديل اللغة',
      skipToContent: 'تجاوز إلى المحتوى الرئيسي',
    };
  }
  return {
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    theme: 'Theme',
    lightMode: 'Light mode',
    darkMode: 'Night mode',
    themeHint: 'Toggle theme',
    start: 'Start here',
    startDesc: 'Choose whether you have a project or want to join as a provider.',
    homeDesc: 'Homepage and services.',
    projectDesc: 'Send your project details for review and matching.',
    contractorDesc: 'Join as a contractor to receive suitable opportunities.',
    consultantDesc: 'Join as a consultant office for design and supervision opportunities.',
    projectOwnersDesc: 'Short explanation for project owners.',
    contractorsDesc: 'Short explanation for contractors.',
    contact: 'Contact',
    contactDesc: 'WhatsApp, Instagram, email, and phone.',
    primary: 'Post project',
    secondary: 'Join as provider',
    social: 'Contact channels',
    quickTitle: 'Choose your path',
    quickSubtitle: 'Start with the closest option.',
    projectNav: 'New project',
    providerNav: 'Provider',
    consultantNav: 'Consultant',
    moreLinks: 'Quick links',
    allPaths: 'All paths',
    appearance: 'Appearance',
    switchLanguage: 'Switch language',
    skipToContent: 'Skip to main content',
  };
}

function ThemeToggle({ theme, onToggle, copy }) {
  const isDark = theme === 'dark';
  const Icon = isDark ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="btn btn-outline h-11 w-11 px-0"
      aria-label={isDark ? copy.lightMode : copy.darkMode}
      title={isDark ? copy.lightMode : copy.darkMode}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
    </button>
  );
}

function MenuDrawer({ open, onClose, copy, t, theme, isDark, rtl, onThemeToggle, closeButtonRef, navigationSearch }) {
  const pathname = usePathname();
  const drawerRef = useRef(null);
  const actionItems = [
    { href: '/post-project', label: t('startProjectTitle'), helper: t('startProjectCta'), icon: Building2, accent: 'teal' },
    { href: '/contractor', label: t('startContractorTitle'), helper: t('startContractorCta'), icon: Hammer, accent: 'amber' },
    { href: '/contractor?type=consultant', label: t('startConsultantTitle'), helper: t('startConsultantCta'), icon: ClipboardList, accent: 'navy' },
  ];
  const secondaryItems = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/start-here', label: copy.allPaths, icon: Sparkles },
    { href: '/for-projects', label: t('startProjectEyebrow'), icon: Users },
    { href: '/for-contractors', label: t('startContractorEyebrow'), icon: CheckCircle2 },
  ];
  const isActive = (href) => isNavigationActive(href, pathname, navigationSearch);
  const keepFocusInDrawer = (event) => {
    if (!open || event.key !== 'Tab') return;
    const focusable = Array.from(drawerRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) || []).filter((element) => !element.hasAttribute('hidden'));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[110] overflow-hidden ${open ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}
      aria-hidden={!open}
      {...(!open ? { inert: '' } : {})}
      onKeyDown={keepFocusInDrawer}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-[#07111D]/45 backdrop-blur-[5px] transition-opacity duration-300 dark:bg-black/60 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
      />
      <aside
        ref={drawerRef}
        id="site-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={copy.menu}
        onClick={(event) => {
          if (event.target.closest('a[href]')) onClose();
        }}
        className={`absolute bottom-0 top-0 ${rtl ? 'left-0' : 'right-0'} w-[min(88vw,390px)] overflow-x-hidden overflow-y-auto border-s border-border bg-card text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.24)] transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : rtl ? '-translate-x-full' : 'translate-x-full'
        }`}
      >
        <div className="menu-drawer-content min-h-full">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" aria-label={t('appName')} className="flex min-h-11 min-w-11 items-center gap-2.5 rounded-xl tap-highlight">
              <Logo className="h-9 w-9" />
              <span className="max-[263px]:hidden"><BrandText size={17} onDark={isDark} /></span>
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="btn btn-outline h-11 w-11 shrink-0 px-0 rounded-full"
              aria-label={copy.closeMenu}
            >
              <X className="h-[18px] w-[18px]" />
            </button>
          </div>

          <section className="mt-6">
            <p className="text-[12px] font-extrabold text-teal">{t('startEyebrow')}</p>
            <h2 className="mt-1 text-[25px] font-extrabold leading-tight text-navy">{copy.quickTitle}</h2>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{copy.quickSubtitle}</p>
          </section>

          <nav className="mt-5 space-y-2.5" aria-label={copy.quickTitle}>
            {actionItems.map((item) => (
              <ActionTile
                key={item.href}
                item={item}
                active={isActive(item.href)}
              />
            ))}
          </nav>

          <div className="mt-6">
            <p className="mb-2.5 text-[12px] font-extrabold text-muted-foreground">{copy.moreLinks}</p>
            <div className="grid grid-cols-2 gap-2.5 max-[263px]:grid-cols-1">
              {secondaryItems.map((item) => (
                <SecondaryDrawerLink key={item.href} item={item} active={isActive(item.href)} />
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-border bg-muted/60 dark:bg-white/[0.04] p-2.5">
            <button
              type="button"
              onClick={onThemeToggle}
              className="flex w-full min-w-0 items-center justify-between gap-2.5 rounded-2xl px-2.5 py-2 text-start transition hover:bg-white dark:hover:bg-white/[0.06]"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#D0F2EE] text-[#152B54] dark:bg-[#00B59E]/20 dark:text-[#00B59E]">
                  {isDark ? <Sun className="h-[17px] w-[17px]" /> : <Moon className="h-[17px] w-[17px]" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-extrabold text-navy">{copy.appearance}</span>
                  <span className="block text-[12px] text-muted-foreground">{theme === 'dark' ? copy.darkMode : copy.lightMode}</span>
                </span>
              </span>
              <span className="hidden shrink-0 whitespace-nowrap text-[12px] font-extrabold text-teal min-[360px]:inline">{copy.themeHint}</span>
            </button>

            <div className="mt-2.5 grid grid-cols-2 gap-2 min-[264px]:grid-cols-4 min-[264px]:gap-2.5">
              <FooterIcon href="mailto:MimaarLink@gmail.com" label={t('contactEmail')} icon={Mail} variant="surface" />
              <FooterIcon href="https://wa.me/97466259219" label={t('contactWhatsapp')} icon={WhatsAppIcon} external variant="surface" />
              <FooterIcon href="tel:+97466259219" label={t('contactPhone')} icon={Phone} variant="surface" />
              <FooterIcon href="https://instagram.com/MimaarLink" label={t('contactInstagram')} icon={Instagram} external variant="surface" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function ActionTile({ item, active }) {
  const { dir } = useLang();
  const Icon = item.icon;
  const accents = {
    teal: {
      icon: 'bg-[#D0F2EE] text-[#152B54] dark:bg-[#00B59E]/20 dark:text-[#00B59E]',
      active: 'border-[#00B59E]/45 bg-[#D0F2EE]/55 dark:bg-[#00B59E]/15',
    },
    amber: {
      icon: 'bg-[#FFB638]/20 text-[#152B54] dark:bg-[#FFB638]/20 dark:text-[#FFB638]',
      active: 'border-[#FFB638]/55 bg-[#FFB638]/15 dark:bg-[#FFB638]/[0.12]',
    },
    navy: {
      icon: 'bg-[#F5F4F1] text-[#152B54] dark:bg-white/[0.08] dark:text-white',
      active: 'border-[#152B54]/30 bg-[#F5F4F1] dark:border-white/20 dark:bg-white/[0.08]',
    },
  };
  const accent = accents[item.accent] || accents.teal;
  return (
    <Link
      href={item.href}
      data-tone={item.accent}
      aria-current={active ? 'page' : undefined}
      className={`group path-card flex items-center gap-3 rounded-[1.25rem] border px-3.5 py-3 transition-all tap-highlight max-[263px]:gap-2 max-[263px]:px-2.5 ${
        active
          ? `${accent.active} shadow-soft`
          : 'hover:-translate-y-0.5 hover:border-[#00B59E]/35 hover:shadow-card'
      }`}
    >
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl max-[263px]:h-10 max-[263px]:w-10 ${accent.icon}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-extrabold text-navy leading-snug">{item.label}</span>
        <span className="mt-0.5 block text-[12px] font-semibold text-muted-foreground">{item.helper}</span>
      </span>
      <ArrowUpRight className={`h-[18px] w-[18px] shrink-0 text-muted-foreground transition-transform max-[263px]:hidden ${dir === 'rtl' ? '-scale-x-100 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
    </Link>
  );
}

function SecondaryDrawerLink({ item, active }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={`flex min-h-11 items-center gap-2 rounded-2xl border px-3 py-2.5 text-[12px] font-extrabold leading-tight transition-all tap-highlight ${
        active
          ? 'border-[#00B59E]/35 bg-[#D0F2EE]/55 text-navy dark:bg-[#00B59E]/15'
          : 'border-border bg-white text-muted-foreground hover:text-navy hover:border-[#00B59E]/35 dark:bg-[#0D1B2A]/70'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="min-w-0">{item.label}</span>
    </Link>
  );
}

function HeaderLink({ href, label, ariaLabel = label, navigationSearch }) {
  const pathname = usePathname();
  const active = isNavigationActive(href, pathname, navigationSearch);
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      title={ariaLabel}
      className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors tap-highlight ${
        active ? 'text-navy bg-muted' : 'text-muted-foreground hover:text-navy hover:bg-muted/70'
      }`}
    >
      {label}
    </Link>
  );
}

function NavBtn({ href, icon: Icon, label, ariaLabel = label, matches = [] }) {
  const pathname = usePathname();
  const active = matches.some((m) => pathname === m);
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      title={ariaLabel}
      className={
        'flex min-h-[56px] min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-1.5 transition-all cta-press tap-highlight ' +
        (active
          ? 'text-[#152B54] shadow-soft'
          : 'text-muted-foreground hover:bg-muted hover:text-navy')
      }
      style={active ? { background: '#00B59E' } : undefined}
    >
      <Icon className="h-[19px] w-[19px] shrink-0" />
      <span className="line-clamp-2 max-w-full text-center text-[11px] font-bold leading-[1.2] min-[360px]:text-[11.5px] min-[360px]:leading-tight">
        {label}
      </span>
    </Link>
  );
}

function SiteFooter({ flush = false, reserveMobileNav = false }) {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className={`${flush ? 'mt-0 border-t border-white/10' : 'mt-16'} premium-panel text-white`}>
      <div className={`container-x pt-12 lg:py-14 ${reserveMobileNav ? 'pb-32' : 'pb-12'}`}>
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 mb-3">
              <Logo className="h-8 w-8" />
              <BrandText size={16} onDark />
            </div>
            <p className="text-[13px] leading-relaxed text-white/70">{t('subtitle')}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/70">
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: '#00B59E' }} />
              {t('contactLocationValue')}
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-white/60">{t('startEyebrow')}</h4>
            <ul className="text-[13px] font-semibold text-white/75">
              <li><Link href="/post-project" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-white">{t('postProject')}</Link></li>
              <li><Link href="/contractor" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-white">{t('providerTypeContractor')}</Link></li>
              <li><Link href="/contractor?type=consultant" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-white">{t('providerTypeConsultant')}</Link></li>
              <li><Link href="/start-here" className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-white">{t('startTitle')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[12px] font-bold uppercase tracking-wide text-white/60">{t('contactTitle')}</h4>
            <div className="flex items-center gap-2.5">
              <FooterIcon href="mailto:MimaarLink@gmail.com" label={t('contactEmail')} icon={Mail} />
              <FooterIcon href="https://wa.me/97466259219" label={t('contactWhatsapp')} icon={WhatsAppIcon} external />
              <FooterIcon href="tel:+97466259219" label={t('contactPhone')} icon={Phone} />
              <FooterIcon href="https://instagram.com/MimaarLink" label={t('contactInstagram')} icon={Instagram} external />
            </div>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-white/10 pt-6 text-center text-[12px] font-medium text-white/60">
          <span>&copy; {year} {t('appName')} &middot; {t('allRights')}</span>
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center rounded-lg px-1.5 font-bold text-white/80 transition-colors hover:text-[#00B59E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B59E]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#152B54]"
          >
            {t('privacyNotice')}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterIcon({ href, label, icon: Icon, external = false, variant = 'footer' }) {
  const classes = variant === 'surface'
    ? 'border-border bg-white text-navy shadow-soft hover:border-[#00B59E]/45 hover:bg-[#D0F2EE]/45 focus-visible:ring-offset-background dark:bg-[#0D1B2A] dark:text-white/85 dark:hover:text-[#00B59E]'
    : 'border-white/15 bg-white/5 text-white/80 hover:border-[#00B59E]/50 hover:text-[#00B59E] hover:bg-white/10 focus-visible:ring-offset-[#0D1B2A]';
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`cta-press tap-highlight relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B59E]/50 focus-visible:ring-offset-2 ${classes}`}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      {external && <ArrowUpRight className="absolute end-1 top-1 h-2.5 w-2.5 text-[#00B59E]" aria-hidden="true" />}
    </a>
  );
}
