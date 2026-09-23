export type Lang = 'it' | 'en' | 'es';

export interface OfferPackage {
  id: string;
  name: string;
  forWho: string;
  includes: string[];
  priceLabel: string;
  cta: string;
}

export interface PortfolioProjectCopy {
  id: string;
  name: string;
  tag: string;
  description: string;
  features: string[];
  tech: string[];
  link: { label: string; url: string } | null;
}

export interface CaseStudyCta {
  label: string;
  action: 'whatsapp' | 'contact' | 'external';
  url?: string;
  presetService?: string;
}

export interface CaseStudyCopy {
  id: string;
  name: string;
  tag: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  ctas: CaseStudyCta[];
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: {
    contact: string;
  };
  hero: {
    tag: string;
    headline: string;
    headlineEmphasis: string;
    subtitle: string;
    ctaPrimary: string;
    ctaPrimaryPrefill: string;
    ctaSecondary: string;
  };
  offers: {
    title: string;
    otherProject: string;
    packages: OfferPackage[];
  };
  caseStudies: {
    title: string;
    galleryHint: string;
    labels: { problem: string; solution: string; result: string; photoCountSuffix: string };
    projects: CaseStudyCopy[];
  };
  about: {
    title: string;
    bio: string;
    photoAlt: string;
    initials: string;
  };
  testimonials: {
    title: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    service: string;
    servicePlaceholder: string;
    serviceOptions: string[];
    budget: string;
    budgetPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    success: string;
    whatsapp: string;
    bookCall: string;
    bookCallSoon: string;
    responsePromise: string;
    orLabel: string;
  };
  footer: {
    contactsLabel: string;
    copyrightTemplate: string;
  };
  chat: {
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    openLabel: string;
    closeLabel: string;
    sendLabel: string;
    errorMessage: string;
  };
}
