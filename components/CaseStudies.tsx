'use client';

import type { Dictionary } from '@/i18n';
import type { SizedImage } from '@/lib/imageSize';
import CaseStudy from './CaseStudy';

export default function CaseStudies({
  dict,
  projectImages,
  videoAvailability,
  whatsappHref,
  onOpenLightbox,
  onSelectPackage,
}: {
  dict: Dictionary;
  projectImages: Record<string, SizedImage[]>;
  videoAvailability: Record<string, boolean>;
  whatsappHref: string;
  onOpenLightbox: (id: string) => void;
  onSelectPackage: (packageName: string) => void;
}) {
  return (
    <section id="portfolio" className="py-20 px-6 border-t border-green-600/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-5xl font-bold mb-20">{dict.caseStudies.title}</h2>
        <div className="space-y-24">
          {dict.caseStudies.projects.map((project) => (
            <CaseStudy
              key={project.id}
              project={project}
              images={projectImages[project.id] ?? []}
              hasVideo={!!videoAvailability[project.id]}
              labels={dict.caseStudies.labels}
              galleryHint={dict.caseStudies.galleryHint}
              whatsappHref={whatsappHref}
              onOpenLightbox={() => onOpenLightbox(project.id)}
              onSelectPackage={onSelectPackage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
