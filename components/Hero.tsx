import { ChevronRight } from 'lucide-react';
import type { Dictionary } from '@/i18n';

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative pt-24 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4 animate-fade-in">
            <p className="text-green-500 text-sm tracking-widest uppercase mono">{dict.hero.tag}</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              {dict.hero.headline}{' '}
              <span className="glow-subtle glow-pulse">{dict.hero.headlineEmphasis}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide">{dict.hero.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-4 animate-fade-in delay-2">
            <a
              href="#contact"
              className="btn-primary px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded"
            >
              {dict.hero.ctaPrimary}
            </a>
            <a
              href="#offerte"
              className="btn-outline px-8 py-3 border border-green-600/50 text-green-500 hover:text-white hover:bg-green-600/10 rounded flex items-center gap-2"
            >
              {dict.hero.ctaSecondary} <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
