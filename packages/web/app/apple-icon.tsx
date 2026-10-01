import { ImageResponse } from 'next/og';

import { LogoMark, OG_COLORS } from '@/lib/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon for iOS: the Mcoli mark on the dark brand background. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: OG_COLORS.background,
      }}
    >
      <LogoMark size={128} />
    </div>,
    { ...size }
  );
}
