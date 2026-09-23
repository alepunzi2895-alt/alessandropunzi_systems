// Progetti rimossi dalla home (Fase 3 del redesign) ma NON cancellati:
// asset in /public/projects/<slug> e copy qui sotto restano disponibili
// per un'eventuale riattivazione futura. Array non renderizzato da nessun componente.
import type { Lang, PortfolioProjectCopy } from '@/i18n/types';

export const archivedProjects: Record<Lang, PortfolioProjectCopy[]> = {
  it: [
    {
      id: 'vmscout',
      name: 'VM Scout',
      tag: 'AI Marketing · React · Claude · Instagram Analytics',
      description:
        'Suite di marketing AI-powered multi-brand: genera strategia visiva, palette colori, direzione artistica e query di ricerca immagini (Unsplash/Pexels/Pixabay) a partire da un brief testuale. Analizza l\'account Instagram collegato con Claude e tiene una "memoria di progetto" che si affina automaticamente ad ogni studio.',
      features: [
        'Motore AI che genera strategia, piano editoriale, post e storyboard video da un brief',
        'Instagram Analytics con Claude: engagement, pubblico, top post e sponsorizzate',
        'Memoria di progetto auto-aggiornante: direttive, punti di forza, cose da migliorare',
        'Integrazione Canva Studio per template brand e creazione bozze automatica',
        'Multi-progetto, multi-lingua (IT/EN/ES/FR/DE), autenticazione utenti',
      ],
      tech: ['React', 'Vite', 'Claude AI', 'Turso / libSQL', 'Vercel Functions'],
      link: null,
    },
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
      id: 'vmscout',
      name: 'VM Scout',
      tag: 'AI Marketing · React · Claude · Instagram Analytics',
      description:
        'Multi-brand AI-powered marketing suite: generates visual strategy, colour palette, art direction and image search queries (Unsplash/Pexels/Pixabay) from a text brief. Analyses the connected Instagram account with Claude and keeps a self-improving "project memory" that refines itself with every study.',
      features: [
        'AI engine that generates strategy, editorial plan, posts and video storyboards from a brief',
        'Instagram Analytics powered by Claude: engagement, audience, top posts and sponsored content',
        'Self-updating project memory: directives, strengths, areas to improve',
        'Canva Studio integration for brand templates and automatic draft creation',
        'Multi-project, multi-language (IT/EN/ES/FR/DE), user authentication',
      ],
      tech: ['React', 'Vite', 'Claude AI', 'Turso / libSQL', 'Vercel Functions'],
      link: null,
    },
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
      id: 'vmscout',
      name: 'VM Scout',
      tag: 'AI Marketing · React · Claude · Instagram Analytics',
      description:
        'Suite de marketing con IA multi-marca: genera estrategia visual, paleta de colores, dirección artística y queries de búsqueda de imágenes (Unsplash/Pexels/Pixabay) a partir de un brief. Analiza la cuenta de Instagram conectada con Claude y mantiene una "memoria de proyecto" que se perfecciona sola con cada estudio.',
      features: [
        'Motor de IA que genera estrategia, plan editorial, posts y storyboard de vídeo desde un brief',
        'Instagram Analytics con Claude: engagement, audiencia, top posts y contenido patrocinado',
        'Memoria de proyecto autoactualizable: directrices, puntos fuertes, cosas a mejorar',
        'Integración con Canva Studio para plantillas de marca y creación automática de borradores',
        'Multi-proyecto, multi-idioma (IT/EN/ES/FR/DE), autenticación de usuarios',
      ],
      tech: ['React', 'Vite', 'Claude AI', 'Turso / libSQL', 'Vercel Functions'],
      link: null,
    },
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
