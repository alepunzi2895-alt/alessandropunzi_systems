// Progetti rimossi dalla home (Fase 3 del redesign) ma NON cancellati:
// asset in /public/projects/<slug> e copy qui sotto restano disponibili
// per un'eventuale riattivazione futura. Array non renderizzato da nessun componente.
import type { Lang, PortfolioProjectCopy } from '@/i18n/types';

export const archivedProjects: Record<Lang, PortfolioProjectCopy[]> = {
  it: [
    {
      id: 'whitesoulibiza',
      name: 'White Soul Ibiza',
      tag: 'Sito Multi-pagina · Vanilla JS · i18n · Concierge',
      description:
        'Sito vetrina multi-pagina per un servizio di concierge ed event planning di lusso a Ibiza. Design editoriale con tipografia Cormorant Garamond, gallerie immersive a tutto schermo e traduzioni caricate da database in 5 lingue.',
      features: [
        'Homepage, Servizi, Esperienze, About e Contatti con navigazione fissa',
        'Traduzioni EN/IT/ES/FR/DE caricate dinamicamente da Turso',
        'Design editoriale full-bleed con font Cormorant Garamond + Inter',
        'Widget WhatsApp e form di contatto per richieste dirette',
        'Zero framework, zero build step — HTML5/CSS3/JS vanilla',
      ],
      tech: ['HTML5', 'CSS3', 'Vanilla JS', 'Turso / libSQL', 'i18n'],
      link: null,
    },
  ],
  en: [
    {
      id: 'whitesoulibiza',
      name: 'White Soul Ibiza',
      tag: 'Multi-page Site · Vanilla JS · i18n · Concierge',
      description:
        'Multi-page showcase site for a luxury concierge and event planning service in Ibiza. Editorial design with Cormorant Garamond typography, full-screen immersive galleries and database-driven translations in 5 languages.',
      features: [
        'Home, Services, Experiences, About and Contact with a fixed navigation',
        'EN/IT/ES/FR/DE translations loaded dynamically from Turso',
        'Full-bleed editorial design with Cormorant Garamond + Inter',
        'WhatsApp widget and contact form for direct enquiries',
        'Zero framework, zero build step — vanilla HTML5/CSS3/JS',
      ],
      tech: ['HTML5', 'CSS3', 'Vanilla JS', 'Turso / libSQL', 'i18n'],
      link: null,
    },
  ],
  es: [
    {
      id: 'whitesoulibiza',
      name: 'White Soul Ibiza',
      tag: 'Sitio Multi-página · Vanilla JS · i18n · Concierge',
      description:
        'Sitio web multi-página para un servicio de concierge y organización de eventos de lujo en Ibiza. Diseño editorial con tipografía Cormorant Garamond, galerías inmersivas a pantalla completa y traducciones cargadas desde base de datos en 5 idiomas.',
      features: [
        'Home, Servicios, Experiencias, About y Contacto con navegación fija',
        'Traducciones EN/IT/ES/FR/DE cargadas dinámicamente desde Turso',
        'Diseño editorial a sangre completa con Cormorant Garamond + Inter',
        'Widget de WhatsApp y formulario de contacto para consultas directas',
        'Cero framework, cero build step — HTML5/CSS3/JS vanilla',
      ],
      tech: ['HTML5', 'CSS3', 'Vanilla JS', 'Turso / libSQL', 'i18n'],
      link: null,
    },
  ],
};
