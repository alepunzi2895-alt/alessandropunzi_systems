'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import type { Lang } from '@/i18n';
import { translations } from '@/i18n';
import type { SizedImage } from '@/lib/imageSize';
import Nav from './Nav';
import Hero from './Hero';
import Offers from './Offers';
import CaseStudies from './CaseStudies';
import About from './About';
import Testimonials from './Testimonials';
import ContactForm from './ContactForm';
import Footer from './Footer';
import DemoChat from './DemoChat';
import { testimonials } from '@/data/testimonials';

export default function PortfolioApp({
  lang,
  videoAvailability,
  projectImages,
}: {
  lang: Lang;
  videoAvailability: Record<string, boolean>;
  projectImages: Record<string, SizedImage[]>;
}) {
  const [formData, setFormData] = useState({ name: '', email: '', prefix: '+39', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [lightbox, setLightbox] = useState<{ id: string; index: number } | null>(null);

  const c = translations[lang];
  const selectPackage = (name: string) => setFormData((f) => ({ ...f, service: name }));

  const lightboxImages = lightbox ? (projectImages[lightbox.id] ?? []) : [];

  const closeLightbox = () => setLightbox(null);
  const showPrev = () =>
    setLightbox((cur) => (cur ? { id: cur.id, index: (cur.index - 1 + lightboxImages.length) % lightboxImages.length } : cur));
  const showNext = () =>
    setLightbox((cur) => (cur ? { id: cur.id, index: (cur.index + 1) % lightboxImages.length } : cur));

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

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
          setFormData({ name: '', email: '', prefix: '+39', phone: '', service: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <style>{`
        body { font-family: var(--font-jakarta), sans-serif; }
        .mono { font-family: var(--font-mono), monospace; }

        /* Corner glow orbs */
        body::before {
          content: '';
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background:
            radial-gradient(ellipse 55% 45% at -2%   8%,  rgba(34,197,94,0.11) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 102%  93%, rgba(34,197,94,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 32% 38% at 101%  4%,  rgba(34,197,94,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 28% 32% at  0%  96%,  rgba(34,197,94,0.05) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* Edge dot grid — visible only at borders, fades toward center */
        body::after {
          content: '';
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image: radial-gradient(circle, rgba(34,197,94,0.13) 1px, transparent 1px);
          background-size: 32px 32px;
          -webkit-mask-image: radial-gradient(ellipse 82% 80% at 50% 50%, transparent 42%, black 72%);
          mask-image: radial-gradient(ellipse 82% 80% at 50% 50%, transparent 42%, black 72%);
          pointer-events: none;
          z-index: 0;
        }

        /* Glow text — filter/drop-shadow instead of text-shadow so the
           infinite pulse below is GPU-composited, not main-thread repainted
           (a repainting LCP element throws off Largest Contentful Paint). */
        .glow-subtle {
          color: #22c55e;
          filter: drop-shadow(0 0 30px rgba(34,197,94,0.4));
        }

        /* Animated hero glow pulse */
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(34,197,94,0.3)); }
          50%       { filter: drop-shadow(0 0 50px rgba(34,197,94,0.7)) drop-shadow(0 0 80px rgba(34,197,94,0.3)); }
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

        /* Logo text shimmer — luxury light sweep */
        @keyframes logo-shimmer {
          0%   { background-position: -250% center; }
          55%  { background-position: 250% center; }
          100% { background-position: 250% center; }
        }
        .logo-text {
          background: linear-gradient(
            105deg,
            #16a34a 0%,
            #22c55e 38%,
            #d1fae5 50%,
            #22c55e 62%,
            #16a34a 100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: logo-shimmer 5s ease-in-out infinite;
          transition: letter-spacing 0.4s ease;
        }
        .logo-text:hover {
          letter-spacing: 0.06em;
        }
      `}</style>

      <Nav lang={lang} />

      <main>
        <Hero dict={c} />

        <Offers dict={c} onSelectPackage={selectPackage} />

        <CaseStudies
          dict={c}
          projectImages={projectImages}
          videoAvailability={videoAvailability}
          onOpenLightbox={(id) => setLightbox({ id, index: 0 })}
          onSelectPackage={selectPackage}
          demo={<DemoChat dict={c} lang={lang} />}
        />

        <About dict={c} />

        <Testimonials dict={c} lang={lang} testimonials={testimonials} />

      {/* Lightbox */}
      {lightbox && lightboxImages[lightbox.index] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-black/60 border border-green-600/40 text-green-400 hover:bg-green-600/20 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/60 border border-green-600/40 text-green-400 hover:bg-green-600/20 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          )}

          <Image
            src={lightboxImages[lightbox.index].src}
            alt={`${lightbox.id} screenshot ${lightbox.index + 1}`}
            width={lightboxImages[lightbox.index].width}
            height={lightboxImages[lightbox.index].height}
            sizes="92vw"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg border border-green-600/20 shadow-[0_0_60px_rgba(34,197,94,0.15)]"
          />

          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-black/60 border border-green-600/40 text-green-400 hover:bg-green-600/20 hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          )}

          {lightboxImages.length > 1 && (
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 mono text-xs text-green-400/80 bg-black/60 px-3 py-1 rounded-full border border-green-600/30">
              {lightbox.index + 1} / {lightboxImages.length}
            </div>
          )}
        </div>
      )}

        <ContactForm dict={c} formData={formData} setFormData={setFormData} submitted={submitted} onSubmit={handleSubmit} />
      </main>

      <Footer dict={c} />
    </div>
  );
}
