'use client';

import { useState } from 'react';
import { Code2, Zap, Camera, Palmtree, Send, ChevronRight } from 'lucide-react';

export default function ProfessionalPortfolio() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    {
      id: 'web',
      title: 'Web Development',
      description: 'Siti moderni, performanti, con focus conversione. React, Next.js, full-stack.',
      icon: Code2,
      details: [
        'Siti responsive, veloci, SEO-optimizzati',
        'E-commerce, SaaS, app web complesse',
        'Performance audit, analytics, conversione',
      ],
    },
    {
      id: 'ia',
      title: 'Sistemi IA & Agenti',
      description: 'Agenti autonomi specializzati, automazione intelligente, ChatBot avanzati.',
      icon: Zap,
      details: [
        'Agenti autonomi specializzati',
        'Chatbot intelligenti per business',
        'Integrazione API, automazione end-to-end',
      ],
    },
    {
      id: 'social',
      title: 'Social Media & Canva',
      description: 'Gestione Instagram, creazione contenuti Canva professionale. Growth garantita.',
      icon: Camera,
      details: [
        'Content calendar, posting, community management',
        'Grafiche Canva professionali, brand consistency',
        'Growth strategy, analytics, engagement boost',
      ],
    },
    {
      id: 'concierge',
      title: 'Concierge Luxury',
      description: 'Esperienze premium, resort management, event planning white-glove.',
      icon: Palmtree,
      details: [
        'Organizzazione eventi, prenotazioni luxury',
        'Scouting resort, gestione VIP experiences',
        'Coordinamento multi-destinazione Ibiza',
      ],
    },
  ];

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

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Subtle background pattern */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.02) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        /* Glow text subtle */
        .glow-subtle {
          color: #22c55e;
          text-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }

        /* Smooth transitions */
        * {
          transition: all 0.3s ease;
        }

        button, a {
          position: relative;
        }

        /* Border glow on hover */
        .border-glow {
          border-color: rgba(34, 197, 94, 0.5);
        }

        .border-glow:hover {
          border-color: rgba(34, 197, 94, 1);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
        }

        /* Fade in animation */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        /* Focus state for inputs */
        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
        }

        /* Smooth hover effects */
        .hover-lift:hover {
          transform: translateY(-4px);
        }

        .text-green {
          color: #22c55e;
        }

        .text-green-dark {
          color: #16a34a;
        }

        .bg-green-dark {
          background-color: rgba(34, 197, 94, 0.05);
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-600/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/ap-systems-logo.png" 
              alt="AP Systems Logo" 
              className="w-10 h-10"
            />
            <div className="text-xl font-bold glow-subtle">
              AP Systems
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-2 border border-green-600/50 text-green-500 hover:text-white hover:bg-green-600/10 rounded transition"
          >
            Contatti
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-32 px-6">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          <div className="space-y-4">
            <p className="text-green-500 text-sm tracking-widest uppercase mono">
              Tech Solutions &amp; Luxury Services
            </p>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Sviluppo Web,<br />
              <span className="glow-subtle">Sistemi IA</span> &amp;<br />
              Servizi Luxury
            </h1>
          </div>

          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Creo soluzioni digitali avanzate e servizi di lusso. Dal web development agli agenti IA, dalla gestione social media al concierge experience a Ibiza.
          </p>

          <div className="flex gap-4">
            <a
              href="#contact"
              className="px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded transition"
            >
              Richiedi Preventivo
            </a>
            <a
              href="#services"
              className="px-8 py-3 border border-green-600/50 text-green-500 hover:text-white hover:bg-green-600/10 rounded transition flex items-center gap-2"
            >
              Scopri Servizi <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 border-t border-green-600/20 bg-gradient-to-b from-transparent via-green-950/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16">Servizi</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon;
              const isSelected = selectedService === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(isSelected ? null : service.id)}
                  className={`p-8 rounded-lg border cursor-pointer transition-all hover-lift ${
                    isSelected
                      ? 'border-green-600/80 bg-green-950/20'
                      : 'border-green-600/20 bg-green-950/5 hover:border-green-600/40'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-green-950/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold flex-1">{service.title}</h3>
                  </div>

                  <p className="text-gray-300 mb-4">{service.description}</p>

                  {isSelected && (
                    <div className="mt-6 pt-6 border-t border-green-600/20 space-y-3 animate-fade-in">
                      {service.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3">
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

      {/* Portfolio */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16">Portfolio</h2>

          <div className="space-y-8">
            {[
              {
                name: 'LuXy Experience',
                desc: 'Piattaforma di concierge luxury con sistema di booking intelligente, IA-powered recommendations e gestione multi-destinazione.',
                tech: ['React', 'Node.js', 'Claude API', 'Stripe', 'PostgreSQL'],
              },
              {
                name: 'VMScout',
                desc: 'Visual Marketing Scout: app per ricerca brand partnerships, content creation con IA e integrazione Canva API per design automatici.',
                tech: ['React', 'Anthropic API', 'Canva API', 'Vercel'],
              },
              {
                name: 'TradeFlow AI',
                desc: 'Bot trading autonomo con 5 strategie specializzate, risk management real-time, monitoring 24/7 e analisi predittive.',
                tech: ['Python', 'MT5', 'Turso DB', 'AI Agents', 'ML Models'],
              },
            ].map((project, idx) => (
              <div
                key={project.name}
                className="border-l-2 border-green-600/40 pl-6 py-4 hover:pl-8 hover:border-green-600/80 transition-all animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-2xl font-bold text-green-500 mb-2">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-green-950/30 border border-green-600/30 text-green-400 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 border-t border-green-600/20 bg-gradient-to-b from-transparent via-green-950/5 to-transparent">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <h2 className="text-5xl font-bold mb-4">Richiedi Preventivo</h2>
            <p className="text-gray-300">
              Completa il modulo e riceverai una proposta personalizzata entro 24 ore.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-green-950/5 border border-green-600/20 p-8 rounded-lg">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Nome</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600"
                placeholder="Il tuo nome"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600"
                placeholder="tua@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Servizio interessato</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white"
              >
                <option value="">Seleziona un servizio</option>
                <option value="web">Web Development</option>
                <option value="ia">Sistemi IA & Agenti</option>
                <option value="social">Social Media & Canva</option>
                <option value="concierge">Concierge Luxury</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Budget orientativo</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white"
              >
                <option value="">Seleziona range</option>
                <option value="500-2000">€ 500 - € 2.000</option>
                <option value="2000-5000">€ 2.000 - € 5.000</option>
                <option value="5000-10000">€ 5.000 - € 10.000</option>
                <option value="10000+">€ 10.000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Descrivimi il progetto</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black border border-green-600/30 rounded text-white placeholder-gray-600 resize-none"
                placeholder="Qual è la tua esigenza? Cosa vorresti realizzare?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Invia Richiesta
            </button>

            {submitted && (
              <div className="p-4 bg-green-950/30 border border-green-600/50 rounded text-green-400 text-center animate-fade-in">
                ✓ Richiesta inviata! Ti contatterò presto.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-600/20 py-12 px-6 text-center text-gray-500 text-sm">
        <p>© 2025 Alessandro Punzi. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
