import { renderOgImage } from '@/lib/ogImage';

export const alt = 'AP Systems';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image({ params }: { params: Promise<{ lang: string }> }) {
  return renderOgImage(params);
}
