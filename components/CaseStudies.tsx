'use client';

import { Fragment, type ReactNode } from 'react';
import type { Dictionary } from '@/i18n';
import type { SizedImage } from '@/lib/imageSize';
import CaseStudy from './CaseStudy';

export default function CaseStudies({
  dict,
  projectImages,
  videoAvailability,
  onOpenLightbox,
  onSelectPackage,
  demo,
}: {
  dict: Dictionary;
  projectImages: Record<string, SizedImage[]>;
  videoAvailability: Record<string, boolean>;
  onOpenLightbox: (id: string) => void;
  onSelectPackage: (packageName: string) => void;
  // Live agent demo, shown right after the case study that links to it.
  demo: ReactNode;
}) {
  return (
    <section id="portfolio" className="py-20 px-6 border-t border-green-600/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-5xl font-bold mb-20">{dict.caseStudies.title}</h2>
        <div className="space-y-24">
          {dict.caseStudies.projects.map((project) => (
            <Fragment key={project.id}>
              <CaseStudy
                project={project}
                images={projectImages[project.id] ?? []}
                hasVideo={!!videoAvailability[project.id]}
                labels={dict.caseStudies.labels}
                galleryHint={dict.caseStudies.galleryHint}
                onOpenLightbox={() => onOpenLightbox(project.id)}
                onSelectPackage={onSelectPackage}
              />
              {project.ctas.some((cta) => cta.action === 'demo') && demo}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
