'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Dictionary } from '@/i18n';

export default function About({ dict }: { dict: Dictionary }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // The image can finish loading (and fail) before hydration attaches the
    // React onError handler, so the native error event is missed. Check the
    // already-settled state on mount as a fallback.
    if (imgRef.current?.complete && imgRef.current.naturalWidth === 0) {
      setPhotoFailed(true);
    }
  }, []);

  return (
    <section id="about" className="py-20 px-6 border-t border-green-600/20">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-8">
        <div className="shrink-0 w-32 h-32 rounded-full overflow-hidden border border-green-600/30 bg-green-950/20 flex items-center justify-center">
          {photoFailed ? (
            <span className="mono text-2xl text-green-500">{dict.about.initials}</span>
          ) : (
            // TODO: /public/me.jpg
            <Image
              ref={imgRef}
              src="/me.jpg"
              alt={dict.about.photoAlt}
              width={128}
              height={128}
              onError={() => setPhotoFailed(true)}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          <h2 className="section-title text-4xl font-bold mb-6">{dict.about.title}</h2>
          <p className="text-gray-300 leading-relaxed max-w-xl">{dict.about.bio}</p>
        </div>
      </div>
    </section>
  );
}
