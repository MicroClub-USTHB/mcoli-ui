import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Mcoli UI – MicroClub UI Components Library';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const bannerData = await readFile(join(process.cwd(), '../../public/banner.svg'), 'base64');
  const bannerSrc = `data:image/svg+xml;base64,${bannerData}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0A',
      }}
    >
      <img src={bannerSrc} width={960} height={192} />
    </div>,
    { ...size }
  );
}
