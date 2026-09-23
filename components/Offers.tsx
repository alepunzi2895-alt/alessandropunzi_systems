'use client';

import { ChevronRight } from 'lucide-react';
import type { Dictionary } from '@/i18n';

export default function Offers({
  dict,
  onSelectPackage,
}: {
  dict: Dictionary;
  onSelectPackage: (packageName: string) => void;
}) {
  return (
    <section
      id="offerte"
      className="py-20 px-6 border-t border-green-600/20 bg-gradient-to-b from-transparent via-green-950/5 to-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-5xl font-bold mb-20">{dict.offers.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {dict.offers.packages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className="card-hover animate-fade-in flex flex-col p-8 rounded-lg border border-green-600/20 bg-green-950/5 hover:border-green-600/50"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{pkg.forWho}</p>
              <div className="space-y-3 mb-6 flex-1">
                {pkg.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mono text-green-400 text-xs mb-6">{pkg.priceLabel}</p>
              <a
                href="#contact"
                onClick={() => onSelectPackage(pkg.name)}
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded"
              >
                {pkg.cta} <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-10">
          <a href="#contact" onClick={() => onSelectPackage('')} className="nav-link hover:text-green-400">
            {dict.offers.otherProject}
          </a>
        </p>
      </div>
    </section>
  );
}
