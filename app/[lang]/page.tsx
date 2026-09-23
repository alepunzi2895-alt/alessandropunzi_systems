import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { notFound } from 'next/navigation';
import { supportedLangs, isSupportedLang } from '@/i18n';
import { projectImagePaths } from '@/data/projects';
import { jpegSize, type SizedImage } from '@/lib/imageSize';
import PortfolioApp from '@/components/PortfolioApp';

export function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }));
}

const CASE_STUDY_SLUGS = ['ibizapartyagent', 'conciergeflow', 'auraibiza'] as const;

function getVideoAvailability(): Record<string, boolean> {
  const availability: Record<string, boolean> = {};
  for (const slug of CASE_STUDY_SLUGS) {
    availability[slug] = existsSync(join(process.cwd(), 'public', 'projects', slug, 'demo.mp4'));
  }
  return availability;
}

function getSizedProjectImages(): Record<string, SizedImage[]> {
  const sized: Record<string, SizedImage[]> = {};
  for (const slug of CASE_STUDY_SLUGS) {
    sized[slug] = (projectImagePaths[slug] ?? []).map((src) => {
      const buf = readFileSync(join(process.cwd(), 'public', src));
      const dims = jpegSize(buf) ?? { width: 1200, height: 800 };
      return { src, ...dims };
    });
  }
  return sized;
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLang(lang)) notFound();

  return (
    <PortfolioApp
      lang={lang}
      videoAvailability={getVideoAvailability()}
      projectImages={getSizedProjectImages()}
    />
  );
}
