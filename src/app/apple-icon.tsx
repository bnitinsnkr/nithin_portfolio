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
          background:
            'radial-gradient(140px 140px at 30% 0%, rgba(51,165,255,0.45), transparent 65%), #05070A',
          color: '#E9EEF6',
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
