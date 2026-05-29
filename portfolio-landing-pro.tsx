'use client';

import { useState } from 'react';
import { Code2, Zap, Camera, Palmtree, Send, ChevronRight } from 'lucide-react';

type Lang = 'it' | 'en' | 'es';

const translations = {
  it: {
    nav: { contact: 'Contatti' },
    hero: {
      tag: 'Concierge & Luxury Services',
      h1: ['Sviluppo Web,', 'Sistemi IA &', 'Servizi Luxury'],
      body: 'Creo soluzioni digitali avanzate e servizi di lusso. Dal web development agli agenti IA, dalla gestione social media al concierge experience a Ibiza.',
      cta1: 'Richiedi Preventivo',
      cta2: 'Scopri Servizi',
    },
    services: {
      title: 'Servizi',
      items: [
        {
          id: 'web',
          title: 'Web Development',
          description: 'Siti moderni, performanti, con focus conversione. React, Next.js, full-stack.',
          details: ['Siti responsive, veloci, SEO-optimizzati', 'E-commerce, SaaS, app web complesse', 'Performance audit, analytics, conversione'],
        },
        {
          id: 'ia',
          title: 'Sistemi IA & Agenti',
          description: 'Agenti autonomi specializzati, automazione intelligente, ChatBot avanzati.',
          details: ['Agenti autonomi specializzati', 'Chatbot intelligenti per business', 'Integrazione API, automazione end-to-end'],
        },
        {
          id: 'social',
          title: 'Social Media & Canva',
          description: 'Gestione Instagram, creazione contenuti Canva professionale. Growth garantita.',
          details: ['Content calendar, posting, community management', 'Grafiche Canva professionali, brand consistency', 'Growth strategy, analytics, engagement boost'],
        },
        {
          id: 'concierge',
          title: 'Concierge Luxury',
          description: 'Esperienze premium, resort management, event planning white-glove.',
          details: ['Organizzazione eventi, prenotazioni luxury', 'Scouting resort, gestione VIP experiences', 'Coordinamento multi-destinazione Ibiza'],
        },
      ],
    },
    contact: {
      title: 'Richiedi Preventivo',
      subtitle: 'Completa il modulo e riceverai una proposta personalizzata entro 24 ore.',
      name: 'Nome', namePlaceholder: 'Il tuo nome',
      email: 'Email', emailPlaceholder: 'tua@email.com',
      service: 'Servizio interessato', servicePlaceholder: 'Seleziona un servizio',
      serviceOptions: ['Web Development', 'Sistemi IA & Agenti', 'Social Media & Canva', 'Concierge Luxury'],
      budget: 'Budget orientativo', budgetPlaceholder: 'Seleziona range',
      message: 'Descrivimi il progetto', messagePlaceholder: 'Qual è la tua esigenza? Cosa vorresti realizzare?',
      submit: 'Invia Richiesta',
      success: '✓ Richiesta inviata! Ti contatterò presto.',
    },
    footer: '© 2025 Alessandro Punzi. Tutti i diritti riservati.',
  },
  en: {
    nav: { contact: 'Contact' },
    hero: {
      tag: 'Concierge & Luxury Services',
      h1: ['Web Development,', 'AI Systems &', 'Luxury Services'],
      body: 'I build advanced digital solutions and luxury services. From web development to AI agents, from social media management to concierge experiences in Ibiza.',
      cta1: 'Request a Quote',
      cta2: 'Explore Services',
    },
    services: {
      title: 'Services',
      items: [
        {
          id: 'web',
          title: 'Web Development',
          description: 'Modern, high-performance websites focused on conversion. React, Next.js, full-stack.',
          details: ['Responsive, fast, SEO-optimized websites', 'E-commerce, SaaS, complex web apps', 'Performance audit, analytics, conversion'],
        },
        {
          id: 'ia',
          title: 'AI Systems & Agents',
          description: 'Specialized autonomous agents, intelligent automation, advanced chatbots.',
          details: ['Specialized autonomous agents', 'Intelligent chatbots for business', 'API integration, end-to-end automation'],
        },
        {
          id: 'social',
          title: 'Social Media & Canva',
          description: 'Instagram management, professional Canva content creation. Guaranteed growth.',
          details: ['Content calendar, posting, community management', 'Professional Canva graphics, brand consistency', 'Growth strategy, analytics, engagement boost'],
        },
        {
          id: 'concierge',
          title: 'Luxury Concierge',
          description: 'Premium experiences, resort management, white-glove event planning.',
          details: ['Event organization, luxury bookings', 'Resort scouting, VIP experience management', 'Multi-destination coordination in Ibiza'],
        },
      ],
    },
    contact: {
      title: 'Request a Quote',
      subtitle: 'Fill out the form and receive a personalized proposal within 24 hours.',
      name: 'Name', namePlaceholder: 'Your name',
      email: 'Email', emailPlaceholder: 'your@email.com',
      service: 'Service of interest', servicePlaceholder: 'Select a service',
      serviceOptions: ['Web Development', 'AI Systems & Agents', 'Social Media & Canva', 'Luxury Concierge'],
      budget: 'Approximate budget', budgetPlaceholder: 'Select range',
      message: 'Describe your project', messagePlaceholder: 'What do you need? What would you like to build?',
      submit: 'Send Request',
      success: "✓ Request sent! I'll get back to you soon.",
    },
    footer: '© 2025 Alessandro Punzi. All rights reserved.',
  },
  es: {
    nav: { contact: 'Contacto' },
    hero: {
      tag: 'Concierge & Servicios Luxury',
      h1: ['Desarrollo Web,', 'Sistemas IA &', 'Servicios Luxury'],
      body: 'Creo soluciones digitales avanzadas y servicios de lujo. Desde desarrollo web hasta agentes IA, desde gestión de redes sociales hasta experiencias concierge en Ibiza.',
      cta1: 'Solicitar Presupuesto',
      cta2: 'Ver Servicios',
    },
    services: {
      title: 'Servicios',
      items: [
        {
          id: 'web',
          title: 'Desarrollo Web',
          description: 'Sitios modernos, de alto rendimiento, enfocados en conversión. React, Next.js, full-stack.',
          details: ['Sitios responsive, rápidos, SEO-optimizados', 'E-commerce, SaaS, apps web complejas', 'Auditoría de rendimiento, analytics, conversión'],
        },
        {
          id: 'ia',
          title: 'Sistemas IA & Agentes',
          description: 'Agentes autónomos especializados, automatización inteligente, ChatBots avanzados.',
          details: ['Agentes autónomos especializados', 'Chatbots inteligentes para negocios', 'Integración API, automatización end-to-end'],
        },
        {
          id: 'social',
          title: 'Social Media & Canva',
          description: 'Gestión de Instagram, creación de contenido Canva profesional. Crecimiento garantizado.',
          details: ['Content calendar, posting, gestión de comunidad', 'Gráficos Canva profesionales, consistencia de marca', 'Estrategia de crecimiento, analytics, engagement boost'],
        },
        {
          id: 'concierge',
          title: 'Concierge Luxury',
          description: 'Experiencias premium, gestión de resorts, planificación de eventos white-glove.',
          details: ['Organización de eventos, reservas luxury', 'Scouting de resorts, gestión de experiencias VIP', 'Coordinación multi-destino Ibiza'],
        },
      ],
    },
    contact: {
      title: 'Solicitar Presupuesto',
      subtitle: 'Completa el formulario y recibirás una propuesta personalizada en 24 horas.',
      name: 'Nombre', namePlaceholder: 'Tu nombre',
      email: 'Email', emailPlaceholder: 'tu@email.com',
      service: 'Servicio de interés', servicePlaceholder: 'Selecciona un servicio',
      serviceOptions: ['Desarrollo Web', 'Sistemas IA & Agentes', 'Social Media & Canva', 'Concierge Luxury'],
      budget: 'Presupuesto orientativo', budgetPlaceholder: 'Selecciona rango',
      message: 'Cuéntame tu proyecto', messagePlaceholder: '¿Cuál es tu necesidad? ¿Qué quieres crear?',
      submit: 'Enviar Solicitud',
      success: '✓ ¡Solicitud enviada! Te contactaré pronto.',
    },
    footer: '© 2025 Alessandro Punzi. Todos los derechos reservados.',
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
  const [formData, setFormData] = useState({ name: '', email: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const c = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', service: '', budget: '', message: '' });
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
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-green-600/20">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/ap-systems-logo.png" alt="AP Systems Logo" className="w-20 h-20 object-contain" />
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
        <p>{c.footer}</p>
      </footer>
    </div>
  );
}
