import './globals.css';
import './typography.css';
import { IBM_Plex_Sans_Arabic, Manrope } from 'next/font/google';
import { headers } from 'next/headers';
import { LANG_HEADER, resolveLanguage } from '@/lib/language.mjs';
import { LangProvider } from '@/lib/LangContext';
import { Toaster } from '@/components/ui/sonner';

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-arabic',
});

const latin = Manrope({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-latin',
  // Let Arabic fall through to Plex, not an inserted Arial fallback.
  adjustFontFallback: false,
});

export const metadata = {
  title: 'MimaarLink - Contractor and consultant bids in Qatar',
  description: 'Post your project and get matched with suitable Qatar contractors or consultant offices based on scope, activity, and location.',
  icons: {
    icon: [{ url: '/logo.png?v=1', type: 'image/png' }],
    shortcut: [{ url: '/logo.png?v=1', type: 'image/png' }],
    apple: [{ url: '/logo.png?v=1', type: 'image/png' }],
  },
};

export default function RootLayout({ children }) {
  const initialLang = resolveLanguage(headers().get(LANG_HEADER));
  return (
    <html lang={initialLang} dir={initialLang === 'ar' ? 'rtl' : 'ltr'} className={`${arabic.variable} ${latin.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('mlTheme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body>
        <LangProvider initialLang={initialLang}>
          {children}
          <Toaster />
        </LangProvider>
      </body>
    </html>
  );
}
