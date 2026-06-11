"use client";
import { useState, useEffect } from "react";

export type AvatarState = "idle" | "thinking" | "celebrating" | "greeting";

const ENCOURAGEMENTS = [
  "You're building real wealth — one lesson at a time! 💚",
  "Every dollar saved is your future self saying thank you!",
  "Financial freedom isn't a dream — it's a plan. Let's make yours! 🌿",
  "You showed up today. That's already winning! ⭐",
  "Small steps, big dreams. Keep going, Paula! 🏆",
  "Money knowledge = money power. You've got this! 💪",
  "The best investment you can make is in yourself. 📚",
  "Progress over perfection — always! 🌱",
  "I'm so proud of how far you've come! 💛",
  "Your emergency fund is your superpower. Build it! 🛡️",
];

const CELEBRATE_MESSAGES = [
  "YES! That's exactly right! 🎉 You just earned XP!",
  "BOOM! 🏅 You're unstoppable!",
  "That's my student! 🌟 +XP added!",
  "Correct! You're smarter about money every single day! 💎",
  "AMAZING! 🥳 Keep that streak going!",
];

const THINKING_MESSAGES = [
  "Let me think about the best way to explain this... 🌿",
  "Great question — pulling together my best answer...",
  "Charlotte is on it! One moment... ✨",
];

export default function CharlotteAvatar({
  state = "idle",
  message,
  size = 90,
  showBubble = true,
}: {
  state?: AvatarState;
  message?: string;
  size?: number;
  showBubble?: boolean;
}) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Rotate encouragements in idle mode
  useEffect(() => {
    if (state !== "idle") return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIdx(i => (i + 1) % ENCOURAGEMENTS.length);
        setVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, [state]);

  const bubbleText =
    message ??
    (state === "celebrating"
      ? CELEBRATE_MESSAGES[msgIdx % CELEBRATE_MESSAGES.length]
      : state === "thinking"
      ? THINKING_MESSAGES[0]
      : ENCOURAGEMENTS[msgIdx]);

  const animClass =
    state === "celebrating"
      ? "charlotte-celebrate"
      : state === "thinking"
      ? "charlotte-think"
      : "charlotte-float";

  const coinSpeed = state === "celebrating" ? "0.7s" : "3.5s";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <style>{`
        @keyframes charlotte-float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-7px) rotate(1deg); }
        }
        @keyframes charlotte-celebrate {
          0%,100% { transform: translateY(0) scale(1) rotate(0deg); }
          20%     { transform: translateY(-14px) scale(1.08) rotate(-4deg); }
          40%     { transform: translateY(-10px) scale(1.06) rotate(4deg); }
          60%     { transform: translateY(-16px) scale(1.1) rotate(-3deg); }
          80%     { transform: translateY(-8px)  scale(1.05) rotate(3deg); }
        }
        @keyframes charlotte-think {
          0%,100% { transform: rotate(0deg); }
          30%     { transform: rotate(-9deg) translateY(-2px); }
          70%     { transform: rotate(9deg)  translateY(-2px); }
        }
        @keyframes charlotte-sparkle {
          0%,100% { opacity:1; transform:scale(1) rotate(0deg); }
          50%     { opacity:0.25; transform:scale(0.6) rotate(20deg); }
        }
        @keyframes charlotte-bubble-in {
          from { opacity:0; transform:translateY(6px) scale(0.96); }
          to   { opacity:1; transform:translateY(0)   scale(1); }
        }
        @keyframes thinking-dot {
          0%,80%,100% { transform:scale(0.6); opacity:0.4; }
          40%         { transform:scale(1.1); opacity:1; }
        }
        .charlotte-avatar   { animation: ${animClass} ${state === "celebrating" ? "0.55s" : state === "thinking" ? "1.4s" : "3.2s"} ease-in-out infinite; }
        .charlotte-sp1      { animation: charlotte-sparkle 2.2s ease-in-out infinite; }
        .charlotte-sp2      { animation: charlotte-sparkle 2.2s ease-in-out infinite 0.75s; }
        .charlotte-sp3      { animation: charlotte-sparkle 2.2s ease-in-out infinite 1.5s; }
        .charlotte-bubble   { animation: charlotte-bubble-in 0.35s ease; }
        .thinking-d1        { animation: thinking-dot 1.4s ease-in-out infinite; }
        .thinking-d2        { animation: thinking-dot 1.4s ease-in-out infinite 0.22s; }
        .thinking-d3        { animation: thinking-dot 1.4s ease-in-out infinite 0.44s; }
      `}</style>

      {/* Avatar + orbit zone */}
      <div style={{ position: "relative", width: size * 2.6, height: size * 2.6, display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Sparkles outside */}
        <div className="charlotte-sp1" style={{ position:"absolute", top:"6%",  left:"4%",  fontSize: size * 0.18, pointerEvents:"none" }}>✨</div>
        <div className="charlotte-sp2" style={{ position:"absolute", top:"4%",  right:"6%", fontSize: size * 0.15, pointerEvents:"none" }}>⭐</div>
        <div className="charlotte-sp3" style={{ position:"absolute", bottom:"8%",right:"3%", fontSize: size * 0.14, pointerEvents:"none" }}>💫</div>
        {state === "celebrating" && (
          <>
            <div className="charlotte-sp1" style={{ position:"absolute", bottom:"6%", left:"5%",  fontSize: size*0.18, pointerEvents:"none" }}>🎉</div>
            <div className="charlotte-sp2" style={{ position:"absolute", top:"20%", left:"2%",  fontSize: size*0.16, pointerEvents:"none" }}>🏅</div>
          </>
        )}

        {/* Charlotte face SVG */}
        <div className="charlotte-avatar" style={{ position: "relative", zIndex: 2 }}>
          <svg
            viewBox="0 0 240 240"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="cFaceGrad" cx="38%" cy="32%" r="65%">
                <stop offset="0%"   stopColor="#2d7a4a"/>
                <stop offset="100%" stopColor="#0a2d18"/>
              </radialGradient>
              <radialGradient id="cCoinGrad" cx="35%" cy="30%" r="65%">
                <stop offset="0%"   stopColor="#e8c97a"/>
                <stop offset="100%" stopColor="#a07820"/>
              </radialGradient>
              <radialGradient id="cBlush" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(201,169,78,0.45)"/>
                <stop offset="100%" stopColor="rgba(201,169,78,0)"/>
              </radialGradient>
              <filter id="cGlow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Outer glow ring on celebrate */}
            {state === "celebrating" && (
              <circle cx="120" cy="128" r="80" fill="rgba(201,169,78,0.12)" filter="url(#cGlow)"/>
            )}

            {/* Subtle halo */}
            <circle cx="120" cy="128" r="72" stroke="rgba(201,169,78,0.18)" strokeWidth="3"/>

            {/* Face */}
            <circle cx="120" cy="128" r="68" fill="url(#cFaceGrad)"/>
            <circle cx="120" cy="128" r="68" stroke="#c9a94e" strokeWidth="3" strokeOpacity="0.5"/>

            {/* Left leaf / crown */}
            <path d="M 76 56 C 58 34 36 40 30 56 C 44 46 66 50 76 68 Z" fill="#1a5c35"/>
            <path d="M 76 56 C 64 42 54 46 56 58 C 62 50 72 52 76 64 Z" fill="#2d7a4a"/>

            {/* Right leaf / crown */}
            <path d="M 164 56 C 182 34 204 40 210 56 C 196 46 174 50 164 68 Z" fill="#1a5c35"/>
            <path d="M 164 56 C 176 42 186 46 184 58 C 178 50 168 52 164 64 Z" fill="#2d7a4a"/>

            {/* Center sprout */}
            <path d="M 120 30 C 114 16 126 16 120 30 Z" fill="#2d7a4a"/>
            <line x1="120" y1="30" x2="120" y2="52" stroke="#1a5c35" strokeWidth="3.5" strokeLinecap="round"/>

            {/* Eyes — whites */}
            <ellipse cx="96"  cy="116" rx="14" ry="16" fill="white"/>
            <ellipse cx="144" cy="116" rx="14" ry="16" fill="white"/>

            {/* Eyes — irises */}
            <circle cx="98"  cy="118" r="8.5" fill="#082010"/>
            <circle cx="146" cy="118" r="8.5" fill="#082010"/>

            {/* Eye shine */}
            <circle cx="101" cy="114" r="3.5" fill="white"/>
            <circle cx="149" cy="114" r="3.5" fill="white"/>
            <circle cx="95"  cy="120" r="1.5" fill="rgba(255,255,255,0.5)"/>
            <circle cx="143" cy="120" r="1.5" fill="rgba(255,255,255,0.5)"/>

            {/* Eyebrows */}
            <path d="M 82 102 Q 96 96 110 100" stroke="#c9a94e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M 130 100 Q 144 96 158 102" stroke="#c9a94e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

            {/* Blush */}
            <ellipse cx="74"  cy="134" rx="14" ry="9"  fill="url(#cBlush)"/>
            <ellipse cx="166" cy="134" rx="14" ry="9"  fill="url(#cBlush)"/>

            {/* Mouth */}
            {state === "thinking" ? (
              /* Thinking "hmm" mouth */
              <path d="M 100 152 Q 120 156 140 152" stroke="rgba(255,255,255,0.7)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            ) : (
              /* Big smile */
              <path d="M 92 150 Q 120 174 148 150" stroke="white" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
            )}

            {/* Thinking dots */}
            {state === "thinking" && (
              <g>
                <circle className="thinking-d1" cx="106" cy="176" r="5" fill="#c9a94e"/>
                <circle className="thinking-d2" cx="120" cy="180" r="5" fill="#c9a94e"/>
                <circle className="thinking-d3" cx="134" cy="176" r="5" fill="#c9a94e"/>
              </g>
            )}

            {/* Orbiting gold coin — SVG animateTransform */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 120 128"
                to="360 120 128"
                dur={coinSpeed}
                repeatCount="indefinite"
              />
              <circle cx="214" cy="128" r="16" fill="url(#cCoinGrad)" filter="url(#cGlow)"/>
              <text x="214" y="133" textAnchor="middle" fontSize="14" fontWeight="900" fontFamily="Georgia, serif" fill="#0e3d22">$</text>
            </g>

            {/* Second orbiting star (offset 180°) on celebrate */}
            {state === "celebrating" && (
              <g>
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="180 120 128"
                  to="540 120 128"
                  dur="0.7s"
                  repeatCount="indefinite"
                />
                <text x="214" y="134" fontSize="18" textAnchor="middle">⭐</text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Speech bubble */}
      {showBubble && (
        <div
          className="charlotte-bubble"
          key={bubbleText}
          style={{
            background: "linear-gradient(135deg, #0e3d22 0%, #1a5c35 100%)",
            border: "1.5px solid rgba(201,169,78,0.45)",
            borderRadius: "14px 14px 14px 4px",
            padding: "10px 15px",
            maxWidth: size * 3,
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          <div style={{ fontSize: 9, color: "#c9a94e", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 4 }}>
            ✨ CHARLOTTE
          </div>

          {state === "thinking" ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span style={{ fontSize: Math.max(11, size * 0.13), color: "#c8d9a8", fontFamily: "DM Sans, sans-serif" }}>
                {bubbleText}
              </span>
            </div>
          ) : (
            <div style={{ fontSize: Math.max(11, size * 0.13), color: "#e8f0d8", lineHeight: 1.45, fontFamily: "DM Sans, sans-serif" }}>
              {bubbleText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
