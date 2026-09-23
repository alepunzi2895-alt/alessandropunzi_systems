import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGS = ['it', 'en', 'es'] as const;
type SupportedLang = (typeof SUPPORTED_LANGS)[number];
const DEFAULT_LANG: SupportedLang = 'en';

function detectLang(req: NextRequest): SupportedLang {
  const acceptLanguage = req.headers.get('accept-language');
  if (!acceptLanguage) return DEFAULT_LANG;

  const preferred = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase().slice(0, 2));

  for (const candidate of preferred) {
    if ((SUPPORTED_LANGS as readonly string[]).includes(candidate)) {
      return candidate as SupportedLang;
    }
  }
  return DEFAULT_LANG;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const pathnameHasLang = SUPPORTED_LANGS.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );
  if (pathnameHasLang) return NextResponse.next();

  const lang = detectLang(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
