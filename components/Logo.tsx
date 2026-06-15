"use client";

export default function CharlotteLogo({
  size = 40,
  showText = false,
  dark = false,
}: {
  size?: number;
  showText?: boolean;
  dark?: boolean;
}) {
  const imgHeight = showText ? size * 2.8 : size * 2.2;

  // On dark sidebar: icon + wordmark side by side, no background wrapper
  if (dark) {
    const iconSize = showText && size >= 40 ? 52 : size;
    const fontSize = showText && size >= 40 ? 15 : Math.max(10, size * 0.38);

    if (showText && size >= 40) {
      // Full sidebar: icon left + "AI Money Mentor" text right
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/aimm-icon.png"
            alt=""
            aria-hidden="true"
            style={{ height: iconSize, width: "auto", display: "block", mixBlendMode: "screen", flexShrink: 0 }}
          />
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "white",
            fontSize,
            fontWeight: 600,
            lineHeight: 1.18,
            letterSpacing: "0.01em",
          }}>
            AI<br />Money<br />Mentor
          </div>
        </div>
      );
    }

    // Compact (mobile topbar): icon only
    return (
      <img
        src="/aimm-icon.png"
        alt="AI Money Mentor"
        style={{ height: iconSize, width: "auto", display: "block", mixBlendMode: "screen" }}
      />
    );
  }

  // On light background: use PNG
  return (
    <img
      src="/aimm-logo-v2.png"
      alt="AI Money Mentor"
      style={{ height: imgHeight, width: "auto", display: "block" }}
    />
  );
}
