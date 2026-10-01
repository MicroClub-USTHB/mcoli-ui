import { ImageResponse } from 'next/og';

import { OgCard } from '@/lib/og';
import { site } from '@/lib/site';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="React component registry"
      title="Ship MicroClub's design system in one command."
      description={`Five themes, light and dark, and ${site.componentCount} accessible components.`}
    />,
    { ...size }
  );
}
