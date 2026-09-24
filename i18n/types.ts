export type Lang = 'it' | 'en' | 'es';

export interface OfferPackage {
  id: string;
  name: string;
  forWho: string;
  includes: string[];
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
  action: 'demo' | 'contact' | 'external';
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

export interface DemoScenarioCopy {
  label: string;
  greeting: string;
  quickReplies: string[];
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
    ctaSecondary: string;
  };
  offers: {
    title: string;
    subtitle: string;
    otherProject: string;
    freeDemo: string;
    freeDemoCta: string;
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
    bio: string[];
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
    message: string;
    messagePlaceholder: string;
    submit: string;
    success: string;
    whatsapp: string;
    bookCall: string;
    responsePromise: string;
    orLabel: string;
  };
  footer: {
    contactsLabel: string;
    copyrightTemplate: string;
  };
  demo: {
    title: string;
    subtitle: string;
    demoBadge: string;
    demoNote: string;
    assistantName: string;
    status: string;
    typing: string;
    placeholder: string;
    sendLabel: string;
    remainingTemplate: string;
    errorMessage: string;
    rateLimitedMessage: string;
    limitTitle: string;
    limitCta: string;
    restart: string;
    scenarios: Record<'properties' | 'support' | 'sales', DemoScenarioCopy>;
  };
}
