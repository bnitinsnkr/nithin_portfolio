import { ImageResponse } from 'next/og';

import { SITE } from '@/constants/site';

export const runtime = 'edge';
export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social card, generated at request time rather than shipped as a static PNG
 * so it always reflects the current title and role line.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          // Satori parses every layer of the `background` shorthand as an image,
          // so the base colour has to be set separately.
          backgroundColor: '#05070A',
          backgroundImage:
            'radial-gradient(1000px 700px at 12% -12%, rgba(51,165,255,0.28), transparent 60%), radial-gradient(900px 600px at 92% 110%, rgba(76,221,240,0.18), transparent 62%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: '1px solid rgba(233,238,246,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#E9EEF6',
              fontSize: 17,
              letterSpacing: -0.6,
            }}
          >
            {SITE.initials}
          </div>
          <div
            style={{
              color: '#70C1FF',
              fontSize: 17,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: -3.4,
              display: 'flex',
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              marginTop: 22,
              color: '#33A5FF',
              fontSize: 32,
              letterSpacing: -0.8,
              display: 'flex',
            }}
          >
            Generative AI · Applied AI · Full Stack Java
          </div>
          <div
            style={{
              marginTop: 26,
              color: '#98A4B6',
              fontSize: 24,
              lineHeight: 1.45,
              maxWidth: 880,
              display: 'flex',
            }}
          >
            6+ years building enterprise RAG systems, NLP pipelines and secure Java/Python backends.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(233,238,246,0.12)',
            paddingTop: 28,
            color: '#78849A',
            fontSize: 21,
          }}
        >
          <div style={{ display: 'flex' }}>American Express · ADP · LTIMindtree</div>
          <div style={{ display: 'flex' }}>{SITE.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
