'use client';

import type { Dictionary, Lang } from '@/i18n';
import type { Testimonial } from '@/data/testimonials';

export default function Testimonials({
  dict,
  lang,
  testimonials,
}: {
  dict: Dictionary;
  lang: Lang;
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 px-6 border-t border-green-600/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-5xl font-bold mb-20">{dict.testimonials.title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="p-8 rounded-lg border border-green-600/20 bg-green-950/5 space-y-4"
            >
              <p className="text-gray-300 leading-relaxed">&ldquo;{t.quote[lang]}&rdquo;</p>
              <footer className="text-sm text-green-500 mono">
                {t.name} — {t.role}, {t.business}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
