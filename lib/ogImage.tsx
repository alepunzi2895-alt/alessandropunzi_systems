import { ImageResponse } from 'next/og';
import { translations, defaultLang, isSupportedLang, type Lang } from '@/i18n';

export const ogSize = { width: 1200, height: 630 };

// Shared renderer for the per-language opengraph-image and twitter-image routes.
export async function renderOgImage(params: Promise<{ lang: string }>) {
  const { lang: rawLang } = await params;
  const lang: Lang = isSupportedLang(rawLang) ? rawLang : defaultLang;
  const dict = translations[lang];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'radial-gradient(ellipse 70% 60% at 0% 0%, rgba(34,197,94,0.22) 0%, #000 65%)',
          backgroundColor: '#000',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#22c55e' }}>{dict.hero.tag}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>{dict.hero.headline}</div>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, lineHeight: 1.1, color: '#22c55e' }}>
            {dict.hero.headlineEmphasis}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 36, fontWeight: 700, color: '#22c55e' }}>AP Systems</div>
      </div>
    ),
    ogSize
  );
}
