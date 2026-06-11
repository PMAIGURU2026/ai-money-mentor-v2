"use client";

/**
 * CharlotteLogo — inline SVG vector, no background, adapts to dark/light context.
 * dark=true  → gold wordmark (for dark sidebar / topbar)
 * dark=false → forest-green wordmark (for light modal / page backgrounds)
 */
export default function CharlotteLogo({
  size = 40,
  showText = false,
  dark = false,
}: {
  size?: number;
  showText?: boolean;
  dark?: boolean;
}) {
  const gold      = "#c9a94e";
  const goldLight = "#e8c97a";
  const green     = "#1a5c35";
  const greenMid  = "#2d7a4a";

  const wordmarkColor  = dark ? goldLight : green;
  const taglineColor   = dark ? "#c8d9a8" : greenMid;
  const iconH          = size * 1.9;          // keeps same visual footprint as old PNG

  return (
    <div style={{ display: "flex", alignItems: "center", gap: showText ? 10 : 0 }}>

      {/* ── Icon mark ── */}
      <svg
        viewBox="0 0 190 200"
        style={{ height: iconH, width: "auto", flexShrink: 0 }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="AI Money Mentor logo"
      >
        {/* Gold bulb ring */}
        <circle cx="95" cy="80" r="62" stroke={gold} strokeWidth="9" />

        {/* Dollar sign */}
        <text
          x="97" y="106"
          textAnchor="middle"
          fontSize="60"
          fontWeight="900"
          fontFamily="Georgia, 'Times New Roman', serif"
          fill={green}
        >
          $
        </text>

        {/* Left large leaf */}
        <path
          d="M 86 96 C 64 70 32 60 16 38 C 35 56 62 70 86 96 Z"
          fill={green}
        />

        {/* Right large leaf */}
        <path
          d="M 104 88 C 126 62 160 50 176 28 C 157 46 130 62 104 88 Z"
          fill={green}
        />

        {/* Small inner left leaf */}
        <path
          d="M 84 110 C 68 96 48 88 36 72 C 54 84 72 94 84 110 Z"
          fill={green}
        />

        {/* Stem (runs from base up through bulb) */}
        <line
          x1="95" y1="152"
          x2="95" y2="90"
          stroke={green} strokeWidth="7" strokeLinecap="round"
        />

        {/* Bulb base bars — narrowing downward */}
        <rect x="67"  y="142" width="56" height="10" rx="5"   fill={gold} />
        <rect x="74"  y="156" width="42" height="9"  rx="4.5" fill={gold} />
        <rect x="81"  y="169" width="28" height="9"  rx="4.5" fill={gold} />
      </svg>

      {/* ── Wordmark ── */}
      {showText && (
        <div>
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: wordmarkColor,
              fontSize: size * 0.78,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.4px",
            }}
          >
            AI Money
            <br />
            Mentor
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: taglineColor,
              fontSize: Math.max(9, size * 0.22),
              marginTop: 4,
              letterSpacing: "0.1px",
              lineHeight: 1.3,
            }}
          >
            Your Financial
            <br />
            Education Partner
          </div>
        </div>
      )}
    </div>
  );
}
