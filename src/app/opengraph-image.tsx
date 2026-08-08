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
          backgroundColor: '#FFFCF8',
          backgroundImage:
            'radial-gradient(900px 620px at 8% -10%, rgba(255,90,54,0.22), transparent 62%), radial-gradient(820px 560px at 95% 108%, rgba(255,158,44,0.20), transparent 64%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: '1px solid rgba(46,39,33,0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1A150F',
              fontSize: 17,
              letterSpacing: -0.6,
            }}
          >
            {SITE.initials}
          </div>
          <div
            style={{
              color: '#C02F11',
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
              color: '#1A150F',
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
              color: '#E8401C',
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
              color: '#5F544A',
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
            borderTop: '1px solid rgba(46,39,33,0.14)',
            paddingTop: 28,
            color: '#7E7265',
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
