/**
 * Shared pieces for generated images (Open Graph cards, app icons). Satori renders these,
 * so only flexbox and inline styles; colors are the Primary theme's dark tokens.
 */
export const OG_COLORS = {
  background: '#0a0a0a',
  card: '#171717',
  border: '#262626',
  foreground: '#fafafa',
  muted: '#a1a1a1',
  primary: '#d9ddff',
  accent: '#3a81f6',
};

/** The Mcoli mark, same paths as components/LogoIcon.tsx. */
export function LogoMark({
  size,
  foreground = OG_COLORS.foreground,
  primary = OG_COLORS.accent,
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

export function OgCard({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        background: OG_COLORS.background,
        backgroundImage: `radial-gradient(circle at 85% 0%, rgba(58, 129, 246, 0.35), transparent 55%), linear-gradient(to right, ${OG_COLORS.border} 1px, transparent 1px), linear-gradient(to bottom, ${OG_COLORS.border} 1px, transparent 1px)`,
        backgroundSize: '100% 100%, 56px 56px, 56px 56px',
        color: OG_COLORS.foreground,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <LogoMark size={64} />
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
          Mcoli
          <span style={{ color: OG_COLORS.accent, marginLeft: 8 }}>UI</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1000 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            fontWeight: 600,
            color: OG_COLORS.primary,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 40 ? 64 : 80,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {description ? (
          <div style={{ display: 'flex', fontSize: 30, lineHeight: 1.4, color: OG_COLORS.muted }}>
            {description.length > 140 ? `${description.slice(0, 137)}...` : description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 24,
          color: OG_COLORS.muted,
        }}
      >
        <span>mcoli-ui.microclub.info</span>
        <span>MicroClub design system</span>
      </div>
    </div>
  );
}
