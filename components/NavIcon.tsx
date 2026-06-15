"use client";

/**
 * NavIcon — custom SVG icon set for AI Money Mentor.
 * All icons are 24×24 viewBox, stroke-based, no emoji.
 * Pass `id` matching a SectionId or a utility key ("more", "signout").
 */

type IconProps = {
  id: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export default function NavIcon({ id, size = 20, color = "currentColor", strokeWidth = 1.8 }: IconProps) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    display: "block" as const,
  };

  switch (id) {

    /* ── DASHBOARD ── */

    case "home":
      // Simple house — pitched roof + walls + door
      return (
        <svg {...p}>
          <path d="M3 10.5L12 3L21 10.5" />
          <path d="M3 10.5V20C3 20.55 3.45 21 4 21H9V15H15V21H20C20.55 21 21 20.55 21 20V10.5" />
        </svg>
      );

    case "budget":
      // Bar chart — 3 ascending bars + baseline
      return (
        <svg {...p}>
          <line x1="2" y1="20" x2="22" y2="20" />
          <rect x="3"  y="14" width="5" height="6"  rx="0.75" />
          <rect x="10" y="8"  width="5" height="12" rx="0.75" />
          <rect x="17" y="4"  width="5" height="16" rx="0.75" />
        </svg>
      );

    case "charlotte":
      // Chat bubble with sprouting plant inside (Charlotte's signature)
      return (
        <svg {...p}>
          <path d="M20 2H4C2.9 2 2 2.9 2 4V15C2 16.1 2.9 17 4 17H7.5L12 22L16.5 17H20C21.1 17 22 16.1 22 15V4C22 2.9 21.1 2 20 2Z" />
          <line x1="12" y1="14" x2="12" y2="9" strokeWidth="1.5" />
          <path d="M12 12C12 10.5 10.2 9.2 9 10" strokeWidth="1.5" />
          <path d="M12 11C12 9.5 13.8 8.2 15 9"  strokeWidth="1.5" />
        </svg>
      );

    case "learn":
      // Open book with page lines
      return (
        <svg {...p}>
          <path d="M2 5C5 4 9 4 12 6V21C9 19 5 19 2 20V5Z" />
          <path d="M22 5C19 4 15 4 12 6V21C15 19 19 19 22 20V5Z" />
          <line x1="5.5" y1="9"  x2="9"   y2="9"  strokeWidth="1.4" />
          <line x1="5.5" y1="12" x2="9"   y2="12" strokeWidth="1.4" />
          <line x1="15"  y1="9"  x2="18.5" y2="9"  strokeWidth="1.4" />
          <line x1="15"  y1="12" x2="18.5" y2="12" strokeWidth="1.4" />
        </svg>
      );

    case "progress":
      // Trophy cup with handles + base
      return (
        <svg {...p}>
          <path d="M8 4H16V13C16 15.2 14.2 17 12 17C9.8 17 8 15.2 8 13V4Z" />
          <path d="M8 6H5C4 6 3 7 3 9C3 11 4.8 12 6.5 12L8 12" />
          <path d="M16 6H19C20 6 21 7 21 9C21 11 19.2 12 17.5 12L16 12" />
          <line x1="12" y1="17" x2="12" y2="20" />
          <line x1="8"  y1="20" x2="16" y2="20" />
          <line x1="6"  y1="22" x2="18" y2="22" />
        </svg>
      );

    case "goals":
      // Bullseye target — three rings + center dot
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
          <line x1="12" y1="3"  x2="12" y2="1"  strokeWidth="1.4" />
          <line x1="21" y1="12" x2="23" y2="12" strokeWidth="1.4" />
          <line x1="12" y1="21" x2="12" y2="23" strokeWidth="1.4" />
          <line x1="3"  y1="12" x2="1"  y2="12" strokeWidth="1.4" />
        </svg>
      );

    case "links":
      // Bookmark ribbon
      return (
        <svg {...p}>
          <path d="M5 3H19C19.55 3 20 3.45 20 4V21L12 17L4 21V4C4 3.45 4.45 3 5 3Z" />
          <line x1="9"  y1="9"  x2="15" y2="9"  strokeWidth="1.4" />
          <line x1="9"  y1="12" x2="15" y2="12" strokeWidth="1.4" />
        </svg>
      );

    /* ── LIFE GOALS ── */

    case "home-buying":
      // House with chimney + keyhole on door — distinct from dashboard Home
      return (
        <svg {...p}>
          <path d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V10.5Z" />
          <line x1="17" y1="5" x2="17" y2="8.5" />
          <rect x="9" y="14" width="6" height="7" rx="0.5" />
          <circle cx="12" cy="17" r="1" fill={color} stroke="none" />
          <line x1="12" y1="18" x2="12" y2="20" />
        </svg>
      );

    case "credit":
      // Credit card with chip + signature line
      return (
        <svg {...p}>
          <rect x="2" y="5" width="20" height="14" rx="2.5" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <rect x="5" y="13.5" width="5" height="3" rx="0.5" />
          <line x1="14" y1="14" x2="19" y2="14" strokeWidth="1.4" />
          <line x1="14" y1="16.5" x2="19" y2="16.5" strokeWidth="1.4" />
        </svg>
      );

    case "investments":
      // Line chart trending up with axes
      return (
        <svg {...p}>
          <line x1="3" y1="21" x2="3"  y2="3" />
          <line x1="3" y1="21" x2="21" y2="21" />
          <polyline points="4,17 7,12 11,14 15,8 20,4" />
          <circle cx="20" cy="4" r="1.5" fill={color} stroke="none" />
        </svg>
      );

    case "retirement":
      // Sunrise over horizon — new day, long-term vision
      return (
        <svg {...p}>
          <line x1="2"  y1="17" x2="22"  y2="17" />
          <line x1="2"  y1="20" x2="22"  y2="20" />
          <path d="M5 17A7 7 0 0 1 19 17" />
          <line x1="12" y1="4"  x2="12"  y2="6.5" />
          <line x1="19.07" y1="6.93" x2="17.36" y2="8.64" />
          <line x1="4.93"  y1="6.93" x2="6.64"  y2="8.64" />
          <line x1="21"  y1="12" x2="18.5" y2="12" />
          <line x1="3"   y1="12" x2="5.5"  y2="12" />
        </svg>
      );

    case "education-529":
      // Graduation cap (mortarboard)
      return (
        <svg {...p}>
          <path d="M2 9L12 4L22 9L12 14L2 9Z" />
          <path d="M6 11.5V17C6 17 8.5 20 12 20C15.5 20 18 17 18 17V11.5" />
          <line x1="22" y1="9" x2="22" y2="15" />
          <line x1="20" y1="15" x2="24" y2="15" strokeWidth="1.4" />
        </svg>
      );

    case "taxes-personal":
      // Document page with dollar sign carved in
      return (
        <svg {...p}>
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="12" y1="9.5" x2="12" y2="16.5" />
          <path d="M9.5 11.8C9.5 11 10.6 10.3 12 10.3C13.4 10.3 14.5 11 14.5 11.8C14.5 12.6 13.4 13.2 12 13.2C10.6 13.2 9.5 13.8 9.5 14.7C9.5 15.5 10.6 16.2 12 16.2C13.4 16.2 14.5 15.5 14.5 14.7" />
        </svg>
      );

    case "taxes-business":
      // Office building — 3 floors, windows, door
      return (
        <svg {...p}>
          <rect x="4" y="3" width="16" height="19" rx="1" />
          <line x1="4"  y1="8"  x2="20" y2="8"  />
          <line x1="4"  y1="13" x2="20" y2="13" />
          <rect x="6.5"  y="5"  width="3" height="2" rx="0.4" />
          <rect x="14.5" y="5"  width="3" height="2" rx="0.4" />
          <rect x="6.5"  y="10" width="3" height="2" rx="0.4" />
          <rect x="14.5" y="10" width="3" height="2" rx="0.4" />
          <path d="M9 22V16.5C9 16 9.4 15.5 10 15.5H14C14.6 15.5 15 16 15 16.5V22" />
        </svg>
      );

    case "estate-planning":
      // Classical columns (Parthenon silhouette)
      return (
        <svg {...p}>
          <line x1="2"  y1="22" x2="22" y2="22" />
          <line x1="3"  y1="20" x2="21" y2="20" />
          <line x1="4"  y1="9"  x2="20" y2="9"  />
          <path d="M4 9L12 3L20 9" />
          <line x1="6.5"  y1="9" x2="6.5"  y2="20" />
          <line x1="12"   y1="9" x2="12"   y2="20" />
          <line x1="17.5" y1="9" x2="17.5" y2="20" />
        </svg>
      );

    /* ── UTILITIES ── */

    case "more":
      // Three horizontal dots (mobile "More" menu)
      return (
        <svg {...p}>
          <circle cx="5"  cy="12" r="1.5" fill={color} stroke="none" />
          <circle cx="12" cy="12" r="1.5" fill={color} stroke="none" />
          <circle cx="19" cy="12" r="1.5" fill={color} stroke="none" />
        </svg>
      );

    case "menu":
      // Hamburger menu
      return (
        <svg {...p}>
          <line x1="3" y1="7"  x2="21" y2="7"  />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      );

    case "close":
      // X close button
      return (
        <svg {...p}>
          <line x1="18" y1="6"  x2="6"  y2="18" />
          <line x1="6"  y1="6"  x2="18" y2="18" />
        </svg>
      );

    case "settings":
      // Gear / cog
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );

    case "watchlist":
      // Eye + mini trend line — "watch a stock"
      return (
        <svg {...p}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
          <polyline points="8,16 10.5,13 13,15 16,11" strokeWidth="1.4" />
        </svg>
      );

    case "signout":
      // Arrow leaving a door
      return (
        <svg {...p}>
          <path d="M9 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9" />
          <polyline points="16,17 21,12 16,7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      );

    case "signin":
      // Arrow entering a door
      return (
        <svg {...p}>
          <path d="M15 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H15" />
          <polyline points="10,17 15,12 10,7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
      );

    case "send":
      // Send / paper plane
      return (
        <svg {...p}>
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22,2 15,22 11,13 2,9" />
        </svg>
      );

    default:
      // Fallback: simple circle
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
