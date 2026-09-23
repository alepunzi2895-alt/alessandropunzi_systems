import { it } from './it';
import { en } from './en';
import { es } from './es';
import type { Dictionary, Lang, CaseStudyCopy, CaseStudyCta, OfferPackage, PortfolioProjectCopy } from './types';

export const supportedLangs: Lang[] = ['it', 'en', 'es'];
export const defaultLang: Lang = 'en';

export const translations: Record<Lang, Dictionary> = { it, en, es };

export function isSupportedLang(value: string): value is Lang {
  return (supportedLangs as string[]).includes(value);
}

export type { Dictionary, Lang, CaseStudyCopy, CaseStudyCta, OfferPackage, PortfolioProjectCopy };
