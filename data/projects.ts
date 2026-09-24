// Raw screenshot paths per project. Real pixel dimensions are read server-side
// (see app/[lang]/page.tsx + lib/imageSize.ts) so next/image gets explicit
// width/height without a hand-maintained table.
export const projectImagePaths: Record<string, string[]> = {
  ibizapartyagent: [
    '/projects/ibizapartyagent/IMG_5676.jpg',
    '/projects/ibizapartyagent/IMG_5677.jpg',
    '/projects/ibizapartyagent/IMG_5678.jpg',
    '/projects/ibizapartyagent/IMG_5679.jpg',
  ],
  auraibiza: [
    '/projects/auraibiza/img-01.jpg',
    '/projects/auraibiza/img-02.jpg',
    '/projects/auraibiza/img-03.jpg',
    '/projects/auraibiza/img-04.jpg',
  ],
  conciergeflow: [
    '/projects/conciergeflow/img-01.jpg',
    '/projects/conciergeflow/img-02.jpg',
    '/projects/conciergeflow/img-03.jpg',
    '/projects/conciergeflow/img-04.jpg',
    '/projects/conciergeflow/img-05.jpg',
    '/projects/conciergeflow/img-06.jpg',
    '/projects/conciergeflow/img-07.jpg',
  ],
  vmscout: [
    '/projects/vmscout/img-01.jpg',
    '/projects/vmscout/img-02.jpg',
    '/projects/vmscout/img-03.jpg',
    '/projects/vmscout/img-04.jpg',
  ],
  whitesoulibiza: [
    '/projects/whitesoulibiza/img-01.jpg',
    '/projects/whitesoulibiza/img-02.jpg',
    '/projects/whitesoulibiza/img-03.jpg',
    '/projects/whitesoulibiza/img-04.jpg',
  ],
};
