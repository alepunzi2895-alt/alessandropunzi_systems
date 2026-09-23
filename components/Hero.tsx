'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import QRCode from 'qrcode';
import type { Dictionary } from '@/i18n';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function Hero({ dict }: { dict: Dictionary }) {
  const whatsappUrl = buildWhatsAppUrl(dict.hero.ctaPrimaryPrefill);
  const [qrSvg, setQrSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toString(whatsappUrl, {
      type: 'svg',
      margin: 1,
      width: 140,
      color: { dark: '#000000', light: '#ffffff' },
    })
      .then((svg) => {
        if (!cancelled) setQrSvg(svg);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [whatsappUrl]);

  return (
    <section className="relative pt-24 pb-32 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_auto] gap-12 items-center">
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
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
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

        {qrSvg && (
          <div className="hidden md:flex flex-col items-center gap-2 shrink-0 animate-fade-in delay-2" aria-hidden="true">
            <div
              className="p-3 bg-white rounded-lg border border-green-600/30"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <p className="text-xs text-gray-400 mono text-center max-w-[140px]">{dict.hero.ctaPrimary}</p>
          </div>
        )}
      </div>
    </section>
  );
}
