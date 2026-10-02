/**
 * Shared pieces for generated images (Open Graph cards, app icons). Satori renders these,
 * so only flexbox and inline styles. Everything follows the Primary theme in dark mode,
 * the same identity as public/banner.png: near-black canvas, grid floor, periwinkle light.
 */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const OG_COLORS = {
  background: '#0a0a0a',
  card: '#171717',
  border: '#262626',
  foreground: '#fafafa',
  muted: '#a1a1a1',
  primary: '#d9ddff',
  /** chart-3, the far end of text-gradient-primary */
  chart: '#2563ef',
};

/** The five themes, as the swatch pairs the landing page shows. */
const THEME_SWATCHES = [
  ['#0006B1', '#E6E9FF'],
  ['#6A0DAD', '#FDDDFF'],
  ['#D04F99', '#FACC15'],
  ['#001EFF', '#00D3FF'],
  ['#34D399', '#BEFFD4'],
];

/** Brand fonts as static TTFs (Satori cannot read variable woff2). Instanced from @fontsource-variable. */
export async function loadOgFonts() {
  const dir = join(process.cwd(), 'assets/og');
  const font = (file: string) => readFile(join(dir, file));
  const [extraBold, bold, regular, medium] = await Promise.all([
    font('PlusJakartaSans-ExtraBold.ttf'),
    font('PlusJakartaSans-Bold.ttf'),
    font('DMSans-Regular.ttf'),
    font('DMSans-Medium.ttf'),
  ]);
  return [
    { name: 'Plus Jakarta Sans', data: extraBold, weight: 800 as const, style: 'normal' as const },
    { name: 'Plus Jakarta Sans', data: bold, weight: 700 as const, style: 'normal' as const },
    { name: 'DM Sans', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'DM Sans', data: medium, weight: 500 as const, style: 'normal' as const },
  ];
}

/** The Mcoli mark, same paths as components/LogoIcon.tsx. */
export function LogoMark({
  size,
  foreground = OG_COLORS.foreground,
  primary = OG_COLORS.primary,
}: {
  size: number;
  foreground?: string;
  primary?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <path
        d="M 16 79 V 31 A 22 22 0 0 1 60 31 A 22 22 0 0 1 104 31 V 79 M 60 31 V 79"
        stroke={foreground}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 38 30 V 80 A 22 22 0 0 0 82 80 V 30"
        stroke={primary}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Shorten at a word boundary so a card never ends mid-word. */
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,.;:]$/, '')}…`;
}

/**
 * Docs card. Layout stays inside a 60px safe margin so platform crops never cut it:
 * wordmark and section chip on top, a large title, one line of description, then the real
 * CLI command for the page with the five theme swatches.
 */
export function OgCard({
  eyebrow,
  title,
  description,
  command,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Rest of the command after `npx mcoli-ui@latest`, e.g. ["add", "mc-button"]. */
  command: [string, string];
}) {
  const titleSize = title.length <= 14 ? 104 : title.length <= 24 ? 88 : 68;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: OG_COLORS.background,
        color: OG_COLORS.foreground,
        fontFamily: 'DM Sans',
      }}
    >
      {/* grid floor, the landing's bg-grid (56px cells), drawn as SVG lines for Satori */}
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {Array.from({ length: 22 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={i * 56 + 0.5}
            y1="0"
            x2={i * 56 + 0.5}
            y2="630"
            stroke={OG_COLORS.border}
          />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 56 + 0.5}
            x2="1200"
            y2={i * 56 + 0.5}
            stroke={OG_COLORS.border}
          />
        ))}
      </svg>
      {/* fade the grid out toward the text, keep it alive top right */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundImage: `radial-gradient(circle at 100% 0%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.55) 40%, ${OG_COLORS.background} 75%)`,
        }}
      />
      {/* periwinkle light, the landing glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundImage:
            'radial-gradient(circle at 100% 0%, rgba(217,221,255,0.30) 0%, rgba(217,221,255,0.10) 35%, rgba(217,221,255,0) 62%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '60px 72px',
        }}
      >
        {/* top: wordmark and section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <LogoMark size={52} />
            <div
              style={{
                display: 'flex',
                fontFamily: 'Plus Jakarta Sans',
                fontWeight: 700,
                fontSize: 34,
                letterSpacing: -0.6,
              }}
            >
              Mcoli
              <span style={{ color: OG_COLORS.primary, marginLeft: 8 }}>UI</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              borderRadius: 999,
              border: `1px solid ${OG_COLORS.border}`,
              background: 'rgba(23,23,23,0.85)',
              fontSize: 22,
              fontWeight: 500,
              color: OG_COLORS.primary,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 8,
                height: 8,
                borderRadius: 99,
                background: OG_COLORS.primary,
              }}
            />
            {eyebrow}
          </div>
        </div>

        {/* middle: title and description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 1000 }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: 800,
              fontSize: titleSize,
              lineHeight: 1.02,
              letterSpacing: -titleSize * 0.04,
            }}
          >
            {clip(title, 48)}
          </div>
          {description ? (
            <div
              style={{ display: 'flex', fontSize: 30, lineHeight: 1.35, color: OG_COLORS.muted }}
            >
              {clip(description, 110)}
            </div>
          ) : null}
        </div>

        {/* bottom: the real command for this page, and the five themes */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px 24px',
              borderRadius: 18,
              border: `1px solid ${OG_COLORS.border}`,
              background: 'rgba(23,23,23,0.9)',
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            <span style={{ color: OG_COLORS.muted }}>$</span>
            <span>npx mcoli-ui@latest</span>
            <span style={{ color: OG_COLORS.muted }}>{command[0]}</span>
            <span
              style={{
                fontWeight: 500,
                backgroundImage: `linear-gradient(100deg, ${OG_COLORS.primary} 15%, #8a96f4 100%)`,
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {command[1]}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {THEME_SWATCHES.map(([a, b], i) => (
              <div
                key={a}
                style={{
                  display: 'flex',
                  width: 30,
                  height: 30,
                  borderRadius: 99,
                  border:
                    i === 0 ? `2px solid ${OG_COLORS.primary}` : `1px solid ${OG_COLORS.border}`,
                  backgroundImage: `linear-gradient(135deg, ${a} 50%, ${b} 50%)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
