'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Lang } from '@/i18n';

const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: 'it', label: 'IT' },
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
];

export default function Nav({ lang }: { lang: Lang }) {
  return (
    <nav className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-green-600/20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="AP Systems Logo" width={256} height={256} sizes="(min-width: 768px) 128px, 96px" priority className="w-24 h-24 md:w-32 md:h-32 object-contain [mask-image:radial-gradient(circle_closest-side,black_78%,transparent_100%)]" />
          <div className="logo-text text-xl font-bold">AP Systems</div>
        </div>
        <div className="flex items-center gap-1 mono text-xs uppercase">
          {LANG_OPTIONS.map((opt, i) => (
            <span key={opt.value} className="flex items-center">
              {i > 0 && <span className="text-green-900 mx-1">/</span>}
              <Link
                href={`/${opt.value}`}
                className={`nav-link px-1.5 py-1 rounded ${
                  lang === opt.value ? 'text-green-400 font-semibold' : 'text-gray-400 hover:text-green-400'
                }`}
              >
                {opt.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
