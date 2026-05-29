'use client';

import { useState } from 'react';
import { Code2, Zap, Camera, Palmtree, Send, ChevronRight } from 'lucide-react';

type Lang = 'it' | 'en' | 'es';

const translations = {
  it: {
    nav: { contact: 'Contatti' },
    hero: {
      tag: 'TECH · AI · LUXURY',
      h1: ['Sviluppo Web,', 'Sistemi AI &', 'Servizi Luxury'],
      subtitle: 'Dal web al concierge — tecnologia e lusso in un\'unica realtà.',
      body: 'Realizzo siti web, agenti AI e servizi concierge di alto livello. Un punto di riferimento unico per chi vuole presenza digitale raffinata ed esperienze luxury a Ibiza.',
      cta1: 'Richiedi Preventivo',
      cta2: 'Scopri i Servizi',
    },
    services: {
      title: 'Servizi',
      items: [
        {
          id: 'web',
          title: 'Web Development',
          description: 'Siti moderni, performanti, con focus sulla conversione. React, Next.js, full-stack.',
          details: [
            'Siti responsive, veloci e SEO-ottimizzati',
            'E-commerce, SaaS e app web complesse',
            'Performance audit, analytics e ottimizzazione conversioni',
          ],
        },
        {
          id: 'ia',
          title: 'Sistemi AI & Agenti',
          description: 'Agenti autonomi specializzati, automazione intelligente e ChatBot avanzati.',
          details: [
            'Agenti autonomi su misura per il tuo business',
            'Chatbot intelligenti per assistenza e vendite',
            'Integrazione API e automazione end-to-end',
          ],
        },
        {
          id: 'social',
          title: 'Social Media & Canva',
          description: 'Gestione Instagram professionale, contenuti Canva di qualità. Crescita garantita.',
          details: [
            'Content calendar, pubblicazione e community management',
            'Grafiche Canva professionali e brand consistency',
            'Strategia di crescita, analytics e aumento engagement',
          ],
        },
        {
          id: 'concierge',
          title: 'Concierge Luxury',
          description: 'Esperienze premium, gestione resort ed event planning white-glove.',
          details: [
            'Organizzazione eventi esclusivi e prenotazioni luxury',
            'Scouting resort e gestione esperienze VIP',
            'Coordinamento multi-destinazione — Ibiza e oltre',
          ],
        },
      ],
    },
    contact: {
      title: 'Richiedi un Preventivo',
      subtitle: 'Compila il modulo e riceverai una proposta personalizzata entro 24 ore.',
      name: 'Nome',
      namePlaceholder: 'Il tuo nome',
      email: 'Email',
      emailPlaceholder: 'tua@email.com',
      phone: 'Numero di telefono',
      phonePlaceholder: 'Inserisci il numero',
      service: 'Servizio di interesse',
      servicePlaceholder: 'Seleziona un servizio',
      serviceOptions: ['Web Development', 'Sistemi AI & Agenti', 'Social Media & Canva', 'Concierge Luxury'],
      budget: 'Budget orientativo',
      budgetPlaceholder: 'Seleziona una fascia',
      message: 'Descrivi il tuo progetto',
      messagePlaceholder: 'Qual è la tua esigenza? Cosa vorresti realizzare?',
      submit: 'Invia Richiesta',
      success: '✓ Richiesta inviata! Ti contatterò entro 24 ore.',
      whatsapp: 'Scrivimi su WhatsApp',
      instagram: 'Seguimi su Instagram',
      orLabel: 'oppure contattami direttamente',
    },
    footer: '© 2025 Alessandro Punzi — Tutti i diritti riservati.',
  },

  en: {
    nav: { contact: 'Contact' },
    hero: {
      tag: 'TECH · AI · LUXURY',
      h1: ['Web Development,', 'AI Systems &', 'Luxury Services'],
      subtitle: 'From web to concierge — technology and luxury in one unique reality.',
      body: 'I build high-end websites, AI agents and concierge services. A single reference point for those who want a refined digital presence and luxury experiences in Ibiza.',
      cta1: 'Request a Quote',
      cta2: 'Explore Services',
    },
    services: {
      title: 'Services',
      items: [
        {
          id: 'web',
          title: 'Web Development',
          description: 'Modern, high-performance websites with a focus on conversion. React, Next.js, full-stack.',
          details: [
            'Responsive, fast, SEO-optimized websites',
            'E-commerce, SaaS and complex web apps',
            'Performance audit, analytics and conversion optimization',
          ],
        },
        {
          id: 'ia',
          title: 'AI Systems & Agents',
          description: 'Specialized autonomous agents, intelligent automation and advanced chatbots.',
          details: [
            'Custom autonomous agents for your business',
            'Intelligent chatbots for support and sales',
            'API integration and end-to-end automation',
          ],
        },
        {
          id: 'social',
          title: 'Social Media & Canva',
          description: 'Professional Instagram management, quality Canva content. Guaranteed growth.',
          details: [
            'Content calendar, posting and community management',
            'Professional Canva graphics and brand consistency',
            'Growth strategy, analytics and engagement boost',
          ],
        },
        {
          id: 'concierge',
          title: 'Luxury Concierge',
          description: 'Premium experiences, resort management and white-glove event planning.',
          details: [
            'Exclusive event organization and luxury bookings',
            'Resort scouting and VIP experience management',
            'Multi-destination coordination — Ibiza and beyond',
          ],
        },
      ],
    },
    contact: {
      title: 'Request a Quote',
      subtitle: 'Fill out the form and receive a personalized proposal within 24 hours.',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      phone: 'Phone number',
      phonePlaceholder: 'Enter your number',
      service: 'Service of interest',
      servicePlaceholder: 'Select a service',
      serviceOptions: ['Web Development', 'AI Systems & Agents', 'Social Media & Canva', 'Luxury Concierge'],
      budget: 'Approximate budget',
      budgetPlaceholder: 'Select a range',
      message: 'Describe your project',
      messagePlaceholder: 'What do you need? What would you like to build?',
      submit: 'Send Request',
      success: "✓ Request sent! I'll get back to you within 24 hours.",
      whatsapp: 'Message me on WhatsApp',
      instagram: 'Follow me on Instagram',
      orLabel: 'or reach me directly',
    },
    footer: '© 2025 Alessandro Punzi — All rights reserved.',
  },

  es: {
    nav: { contact: 'Contacto' },
    hero: {
      tag: 'TECH · AI · LUXURY',
      h1: ['Desarrollo Web,', 'Sistemas AI &', 'Servicios Luxury'],
      subtitle: 'Del web al concierge — tecnología y lujo en una única realidad.',
      body: 'Creo sitios web de alto nivel, agentes AI y servicios concierge exclusivos. Un punto de referencia único para quienes quieren presencia digital refinada y experiencias luxury en Ibiza.',
      cta1: 'Solicitar Presupuesto',
      cta2: 'Ver Servicios',
    },
    services: {
      title: 'Servicios',
      items: [
        {
          id: 'web',
          title: 'Desarrollo Web',
          description: 'Sitios modernos y de alto rendimiento, enfocados en la conversión. React, Next.js, full-stack.',
          details: [
            'Sitios responsive, rápidos y optimizados para SEO',
            'E-commerce, SaaS y apps web complejas',
            'Auditoría de rendimiento, analytics y optimización de conversiones',
          ],
        },
        {
          id: 'ia',
          title: 'Sistemas IA & Agentes',
          description: 'Agentes autónomos especializados, automatización inteligente y ChatBots avanzados.',
          details: [
            'Agentes autónomos a medida para tu negocio',
            'Chatbots inteligentes para soporte y ventas',
            'Integración de APIs y automatización end-to-end',
          ],
        },
        {
          id: 'social',
          title: 'Social Media & Canva',
          description: 'Gestión profesional de Instagram, contenido Canva de calidad. Crecimiento garantizado.',
          details: [
            'Content calendar, publicaciones y gestión de comunidad',
            'Diseños Canva profesionales y consistencia de marca',
            'Estrategia de crecimiento, analytics y aumento de engagement',
          ],
        },
        {
          id: 'concierge',
          title: 'Concierge Luxury',
          description: 'Experiencias premium, gestión de resorts y planificación de eventos white-glove.',
          details: [
            'Organización de eventos exclusivos y reservas luxury',
            'Scouting de resorts y gestión de experiencias VIP',
            'Coordinación multi-destino — Ibiza y más allá',
          ],
        },
      ],
    },
    contact: {
      title: 'Solicitar Presupuesto',
      subtitle: 'Completa el formulario y recibirás una propuesta personalizada en 24 horas.',
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Email',
      emailPlaceholder: 'tu@email.com',
      phone: 'Número de teléfono',
      phonePlaceholder: 'Introduce tu número',
      service: 'Servicio de interés',
      servicePlaceholder: 'Selecciona un servicio',
      serviceOptions: ['Desarrollo Web', 'Sistemas IA & Agentes', 'Social Media & Canva', 'Concierge Luxury'],
      budget: 'Presupuesto orientativo',
      budgetPlaceholder: 'Selecciona una franja',
      message: 'Cuéntame tu proyecto',
      messagePlaceholder: '¿Cuál es tu necesidad? ¿Qué quieres crear?',
      submit: 'Enviar Solicitud',
      success: '✓ ¡Solicitud enviada! Te contactaré en 24 horas.',
      whatsapp: 'Escríbeme por WhatsApp',
      instagram: 'Sígueme en Instagram',
      orLabel: 'o contáctame directamente',
    },
    footer: '© 2025 Alessandro Punzi — Todos los derechos reservados.',
  },
};

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  web: Code2,
  ia: Zap,
  social: Camera,
  concierge: Palmtree,
};

const budgetOptions = [
  { value: '500-2000', label: '€ 500 – € 2.000' },
  { value: '2000-5000', label: '€ 2.000 – € 5.000' },
  { value: '5000-10000', label: '€ 5.000 – € 10.000' },
  { value: '10000+', label: '€ 10.000+' },
];

export default function ProfessionalPortfolio() {
  const [lang, setLang] = useState<Lang>('it');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', prefix: '+39', phone: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const c = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang }),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', prefix: '+39', phone: '', service: '', budget: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }

        body::before {
          content: '';
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background:
            radial-gradient(circle at 20% 50%, rgba(34,197,94,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(34,197,94,0.03) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        /* Glow text */
        .glow-subtle {
          color: #22c55e;
          text-shadow: 0 0 30px rgba(34,197,94,0.4);
        }

        /* Animated hero glow pulse */
        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 20px rgba(34,197,94,0.3); }
          50%       { text-shadow: 0 0 50px rgba(34,197,94,0.7), 0 0 80px rgba(34,197,94,0.3); }
        }
        .glow-pulse { animation: glow-pulse 4s ease-in-out infinite; }

        /* Fade in */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.7s ease-out both; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }

        /* Shimmer on hover */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Card hover */
        .card-hover {
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1),
                      box-shadow 0.35s cubic-bezier(0.4,0,0.2,1),
                      border-color 0.35s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 0 0 1px rgba(34,197,94,0.4),
                      0 0 40px rgba(34,197,94,0.15),
                      0 30px 60px rgba(0,0,0,0.5);
        }

        /* Icon box hover */
        .icon-box {
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }
        .card-hover:hover .icon-box {
          transform: scale(1.15) rotate(6deg);
          box-shadow: 0 0 20px rgba(34,197,94,0.35);
          background-color: rgba(34,197,94,0.15);
        }

        /* Primary button */
        .btn-primary {
          transition: background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }
        .btn-primary:hover {
          box-shadow: 0 0 30px rgba(34,197,94,0.5), 0 0 60px rgba(34,197,94,0.2);
          transform: translateY(-2px);
        }
        .btn-primary:active { transform: translateY(0); }

        /* Outline button */
        .btn-outline {
          transition: color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }
        .btn-outline:hover {
          box-shadow: 0 0 20px rgba(34,197,94,0.2), inset 0 0 20px rgba(34,197,94,0.05);
          transform: translateY(-2px);
        }

        /* Nav link */
        .nav-link {
          position: relative;
          transition: color 0.25s ease, box-shadow 0.25s ease;
        }
        .nav-link:hover {
          box-shadow: 0 0 14px rgba(34,197,94,0.3);
        }

        /* Form field focus */
        input, select, textarea {
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 2px rgba(34,197,94,0.12), 0 0 16px rgba(34,197,94,0.1);
        }

        /* Submit button */
        .btn-submit {
          transition: background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
        }
        .btn-submit:hover {
          box-shadow: 0 0 30px rgba(34,197,94,0.45), 0 0 60px rgba(34,197,94,0.15);
          transform: translateY(-2px);
        }

        /* Language select */
        .lang-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2322c55e' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          padding-right: 24px;
          cursor: pointer;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .lang-select:hover {
          border-color: rgba(34,197,94,0.7);
          box-shadow: 0 0 12px rgba(34,197,94,0.2);
        }
        .lang-select:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 14px rgba(34,197,94,0.3);
        }
        .lang-select option {
          background: #000;
          color: #22c55e;
        }

        /* Section title decoration */
        .section-title {
          position: relative;
          display: inline-block;
        }
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -8px; left: 0;
          width: 40px; height: 2px;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34,197,94,0.6);
          border-radius: 2px;
          transition: width 0.4s ease;
        }
        .section-title:hover::after { width: 100%; }

        /* Social buttons */
        .social-btn {
          transition: border-color 0.25s ease, background-color 0.25s ease,
                      box-shadow 0.25s ease, transform 0.2s ease;
        }
        .social-btn:hover { transform: translateY(-2px); }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-green-600/20">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="AP Systems Logo" className="w-20 h-20 object-contain" />
            <div className="text-xl font-bold glow-subtle">AP Systems</div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="lang-select mono text-xs uppercase bg-black border border-green-600/40 text-green-400 rounded px-2 py-1.5"
            >
              <option value="it">🇮🇹 IT</option>
              <option value="en">🇬🇧 EN</option>
              <option value="es">🇪🇸 ES</option>
            </select>
            <a
              href="#contact"
              className="nav-link px-5 py-2 border border-green-600/50 text-green-500 hover:text-white hover:bg-green-600/10 rounded"
            >
              {c.nav.contact}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-32 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="space-y-4 animate-fade-in">
            <p className="text-green-500 text-sm tracking-widest uppercase mono">{c.hero.tag}</p>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              {c.hero.h1[0]}
              <br />
              <span className="glow-subtle glow-pulse">{c.hero.h1[1]}</span>
              <br />
              {c.hero.h1[2]}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide">
              {c.hero.subtitle}
            </p>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed animate-fade-in delay-1">
            {c.hero.body}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in delay-2">
            <a
              href="#contact"
              className="btn-primary px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded"
            >
              {c.hero.cta1}
            </a>
            <a
              href="#services"
              className="btn-outline px-8 py-3 border border-green-600/50 text-green-500 hover:text-white hover:bg-green-600/10 rounded flex items-center gap-2"
            >
              {c.hero.cta2} <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 border-t border-green-600/20 bg-gradient-to-b from-transparent via-green-950/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-5xl font-bold mb-20">{c.services.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {c.services.items.map((service, idx) => {
              const IconComponent = serviceIcons[service.id];
              const isSelected = selectedService === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(isSelected ? null : service.id)}
                  className={`card-hover animate-fade-in p-8 rounded-lg border cursor-pointer ${
                    isSelected
                      ? 'border-green-600/80 bg-green-950/20'
                      : 'border-green-600/20 bg-green-950/5 hover:border-green-600/50'
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="icon-box p-3 bg-green-950/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold flex-1 pt-1">{service.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  {isSelected && (
                    <div className="mt-6 pt-6 border-t border-green-600/20 space-y-3 animate-fade-in">
                      {service.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-gray-300">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 border-t border-green-600/20 bg-gradient-to-b from-transparent via-green-950/5 to-transparent">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <h2 className="section-title text-5xl font-bold mb-4">{c.contact.title}</h2>
            <p className="text-gray-300 mt-6">{c.contact.subtitle}</p>
          </div>

          {/* Quick contact */}
          <div className="mb-8 space-y-3">
            <p className="text-xs uppercase tracking-widest text-gray-500 mono">{c.contact.orLabel}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/393806599140"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn flex items-center gap-3 px-5 py-3 rounded-lg border border-[#25D366]/40 bg-[#25D366]/5 text-[#25D366] hover:border-[#25D366]/80 hover:bg-[#25D366]/10 flex-1"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="font-medium text-sm">{c.contact.whatsapp}</span>
              </a>
              <a
                href="https://instagram.com/therealmfkk"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn flex items-center gap-3 px-5 py-3 rounded-lg border border-pink-500/40 bg-pink-500/5 text-pink-400 hover:border-pink-500/80 hover:bg-pink-500/10 flex-1"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span className="font-medium text-sm">{c.contact.instagram}</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-green-950/5 border border-green-600/20 p-8 rounded-lg">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">{c.contact.name}</label>
              <input
                type="text" required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600"
                placeholder={c.contact.namePlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">{c.contact.email}</label>
              <input
                type="email" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600"
                placeholder={c.contact.emailPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">{c.contact.phone}</label>
              <div className="flex gap-2">
                <select
                  value={formData.prefix}
                  onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
                  className="w-28 px-3 py-3 bg-black border border-green-600/30 rounded text-white shrink-0"
                >
                  <option value="+39">🇮🇹 +39</option>
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+49">🇩🇪 +49</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+31">🇳🇱 +31</option>
                  <option value="+41">🇨🇭 +41</option>
                  <option value="+43">🇦🇹 +43</option>
                  <option value="+351">🇵🇹 +351</option>
                </select>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex-1 px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600"
                  placeholder={c.contact.phonePlaceholder}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">{c.contact.service}</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white"
              >
                <option value="">{c.contact.servicePlaceholder}</option>
                {c.contact.serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">{c.contact.budget}</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white"
              >
                <option value="">{c.contact.budgetPlaceholder}</option>
                {budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">{c.contact.message}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required rows={4}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600 resize-none"
                placeholder={c.contact.messagePlaceholder}
              />
            </div>
            <button
              type="submit"
              className="btn-submit w-full py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {c.contact.submit}
            </button>
            {submitted && (
              <div className="p-4 bg-green-950/30 border border-green-600/50 rounded text-green-400 text-center animate-fade-in">
                {c.contact.success}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-600/20 py-12 px-6 text-center text-gray-500 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://wa.me/393806599140"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366]/60 hover:text-[#25D366] transition-colors"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com/therealmfkk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500/60 hover:text-pink-400 transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        </div>
        <p>{c.footer}</p>
      </footer>
    </div>
  );
}
