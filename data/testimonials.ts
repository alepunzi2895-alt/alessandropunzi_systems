import type { Lang } from '@/i18n/types';

export interface Testimonial {
  quote: Record<Lang, string>;
  name: string;
  role: string;
  business: string;
}

// [[TODO: testimonianza reale — nome, ruolo, business]]
// Struttura pronta da compilare e spostare nell'array sottostante quando disponibile:
// {
//   quote: { it: '...', en: '...', es: '...' },
//   name: 'Nome Cognome',
//   role: 'Ruolo',
//   business: 'Nome business',
// },

export const testimonials: Testimonial[] = [];
