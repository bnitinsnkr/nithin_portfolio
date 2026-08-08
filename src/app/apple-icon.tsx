import { ImageResponse } from 'next/og';

import { SITE } from '@/constants/site';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Satori parses every layer of the `background` shorthand as an image,
          // so the base colour has to be set separately.
          backgroundColor: '#FF5A36',
          backgroundImage:
            'radial-gradient(180px 180px at 78% 100%, rgba(255,158,44,0.85), transparent 62%)',
          color: '#FFFCF8',
          fontSize: 76,
          letterSpacing: -3,
        }}
      >
        {SITE.initials}
      </div>
    ),
    size,
  );
}
