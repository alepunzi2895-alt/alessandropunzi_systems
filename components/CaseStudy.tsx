'use client';

import Image from 'next/image';
import { ChevronRight, Maximize2 } from 'lucide-react';
import type { CaseStudyCopy, Dictionary } from '@/i18n';
import type { SizedImage } from '@/lib/imageSize';
import { isRenderable } from '@/lib/content';

export default function CaseStudy({
  project,
  images,
  hasVideo,
  labels,
  galleryHint,
  onOpenLightbox,
  onSelectPackage,
}: {
  project: CaseStudyCopy;
  images: SizedImage[];
  hasVideo: boolean;
  labels: Dictionary['caseStudies']['labels'];
  galleryHint: string;
  onOpenLightbox: () => void;
  onSelectPackage: (packageName: string) => void;
}) {
  const mainImage = images[0];

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start border-t border-green-600/10 pt-12 first:border-t-0 first:pt-0">
      {/* Media */}
      <div className="relative">
        {hasVideo ? (
          <video
            src={`/projects/${project.id}/demo.mp4`}
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-auto rounded-xl border border-green-600/20"
          />
        ) : (
          mainImage && (
            <div
              onClick={onOpenLightbox}
              className="group relative rounded-xl overflow-hidden border border-green-600/20 cursor-zoom-in"
            >
              <Image
                src={mainImage.src}
                alt={`${project.name} screenshot`}
                width={mainImage.width}
                height={mainImage.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-90 transition-opacity duration-300 drop-shadow-lg" />
              </div>
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 mono text-xs text-green-400/90 bg-black/60 px-2 py-1 rounded-full border border-green-600/30">
                  {images.length} {labels.photoCountSuffix}
                </div>
              )}
            </div>
          )
        )}
        {!hasVideo && images.length > 1 && (
          <p className="text-xs text-gray-400 mono mt-2 text-center">{galleryHint}</p>
        )}
      </div>

      {/* Copy */}
      <div className="space-y-6">
        <div>
          <p className="text-green-500 text-xs tracking-widest uppercase mono mb-2">{project.tag}</p>
          <h3 className="text-4xl font-bold">{project.name}</h3>
        </div>

        <div className="space-y-4">
          {[
            { label: labels.problem, text: project.problem },
            { label: labels.solution, text: project.solution },
            { label: labels.result, text: project.result },
          ]
            .filter((block) => isRenderable(block.text))
            .map((block) => (
              <div key={block.label}>
                <p className="text-xs uppercase tracking-widest text-gray-400 mono mb-1">{block.label}</p>
                <p className="text-gray-300 leading-relaxed">{block.text}</p>
              </div>
            ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.ctas.map((cta) => {
            if (cta.action === 'demo') {
              return (
                <a
                  key={cta.label}
                  href="#demo"
                  className="btn-primary inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-semibold rounded"
                >
                  {cta.label} <ChevronRight className="w-4 h-4" />
                </a>
              );
            }
            if (cta.action === 'external') {
              return (
                <a
                  key={cta.label}
                  href={cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-pink-500/40 bg-pink-500/5 text-pink-400 hover:border-pink-500/80 hover:bg-pink-500/10 font-semibold"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  {cta.label}
                </a>
              );
            }
            return (
              <a
                key={cta.label}
                href="#contact"
                onClick={() => onSelectPackage(cta.presetService ?? '')}
                className="btn-outline inline-flex items-center gap-2 px-6 py-3 border border-green-600/50 text-green-500 hover:text-white hover:bg-green-600/10 rounded"
              >
                {cta.label} <ChevronRight className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="tech-badge text-[11px] px-3 py-1 bg-green-950/20 border border-green-600/15 text-green-500/80 rounded-full mono"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
