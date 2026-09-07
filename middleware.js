import { NextResponse } from 'next/server';
import { LANG_COOKIE, LANG_HEADER, resolveLanguage } from './lib/language.mjs';

export function middleware(request) {
  const language = resolveLanguage(
    request.nextUrl.searchParams.get('lang'),
    request.cookies.get(LANG_COOKIE)?.value,
  );
  const requestHeaders = new Headers(request.headers);
  // Always overwrite: an incoming header must never select an arbitrary locale.
  requestHeaders.set(LANG_HEADER, language);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
