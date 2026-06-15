"use client";
import { useState, useEffect } from "react";

export type AvatarState = "idle" | "thinking" | "celebrating" | "greeting";

const ENCOURAGEMENTS = [
  "Let's make your money make sense (and some cents)!",
  "Every dollar saved is your future self saying thank you!",
  "Financial freedom isn't a dream — it's a plan. Let's make yours!",
  "You showed up today. That's already winning!",
  "Small steps, big dreams. Keep going!",
  "Money knowledge = money power. You've got this!",
  "The best investment you can make is in yourself.",
  "Progress over perfection — always!",
  "Compound confidence, not drama. That's our motto!",
  "Your emergency fund is your superpower. Build it!",
];

const CELEBRATE_MESSAGES = [
  "YES! That's exactly right! You just earned XP!",
  "BOOM! You're unstoppable!",
  "That's my student! +XP added!",
  "Correct! You're smarter about money every single day!",
  "AMAZING! Keep that streak going!",
];

const THINKING_MESSAGES = [
  "Let me think about the best way to explain this...",
  "Great question — pulling together my best answer...",
  "Charlotte is on it! One moment...",
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
          50%      { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes charlotte-celebrate {
          0%,100% { transform: translateY(0) scale(1); }
          30%     { transform: translateY(-12px) scale(1.06) rotate(-3deg); }
          60%     { transform: translateY(-14px) scale(1.09) rotate(3deg); }
          80%     { transform: translateY(-8px) scale(1.04); }
        }
        @keyframes charlotte-think {
          0%,100% { transform: rotate(0deg); }
          30%     { transform: rotate(-6deg) translateY(-2px); }
          70%     { transform: rotate(6deg) translateY(-2px); }
        }
        @keyframes coin-orbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes charlotte-bubble-in {
          from { opacity:0; transform:translateY(6px) scale(0.96); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes thinking-dot {
          0%,80%,100% { transform:scale(0.6); opacity:0.4; }
          40%          { transform:scale(1.1); opacity:1; }
        }
        .charlotte-avatar { animation: ${animClass} ${state === "celebrating" ? "0.55s" : state === "thinking" ? "1.4s" : "3.2s"} ease-in-out infinite; }
        .charlotte-bubble { animation: charlotte-bubble-in 0.35s ease; }
        .charlotte-coin   { animation: coin-orbit ${coinSpeed} linear infinite; }
        .thinking-d1      { animation: thinking-dot 1.4s ease-in-out infinite; }
        .thinking-d2      { animation: thinking-dot 1.4s ease-in-out infinite 0.22s; }
        .thinking-d3      { animation: thinking-dot 1.4s ease-in-out infinite 0.44s; }
      `}</style>

      {/* Avatar + orbit zone */}
      <div style={{ position: "relative", width: size * 2, height: size * 2, display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Orbiting gold coin */}
        <div
          className="charlotte-coin"
          style={{
            position: "absolute",
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        >
          <div style={{
            position: "absolute",
            top: "50%",
            right: size * -0.2,
            transform: "translateY(-50%)",
            width: size * 0.3,
            height: size * 0.3,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #e8c97a, #a07820)",
            boxShadow: "0 2px 8px rgba(201,169,78,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.14,
            fontWeight: 900,
            color: "#0e3d22",
            fontFamily: "Georgia, serif",
          }}>$</div>
        </div>

        {/* Second coin on celebrating */}
        {state === "celebrating" && (
          <div
            className="charlotte-coin"
            style={{
              position: "absolute",
              width: size * 1.5,
              height: size * 1.5,
              borderRadius: "50%",
              pointerEvents: "none",
              transform: "rotate(180deg)",
            }}
          >
            <div style={{
              position: "absolute",
              top: "50%",
              right: size * -0.2,
              transform: "translateY(-50%)",
              width: size * 0.26,
              height: size * 0.26,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, #e8c97a, #a07820)",
              boxShadow: "0 2px 8px rgba(201,169,78,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: size * 0.13,
              fontWeight: 900,
              color: "#0e3d22",
              fontFamily: "Georgia, serif",
            }}>$</div>
          </div>
        )}

        {/* Charlotte portrait — real character image */}
        <div
          className="charlotte-avatar"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            zIndex: 2,
            border: `${Math.max(2, size * 0.04)}px solid rgba(201,169,78,0.6)`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.35), 0 0 0 ${Math.max(1, size * 0.02)}px rgba(201,169,78,0.2)`,
            flexShrink: 0,
          }}
        >
          {/* Charlotte image — cropped to show her face + upper body */}
          <img
            src="/charlotte-face.png"
            alt="Charlotte, your AI financial mentor"
            style={{
              width: size,
              height: size,
              display: "block",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Thinking dots */}
        {state === "thinking" && (
          <div style={{
            position: "absolute",
            bottom: "14%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 4,
            zIndex: 3,
          }}>
            <div className="thinking-d1" style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a94e" }} />
            <div className="thinking-d2" style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a94e" }} />
            <div className="thinking-d3" style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a94e" }} />
          </div>
        )}
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
            maxWidth: size * 4.2,
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 4 }}>
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none"><defs><linearGradient id="bstarGrad" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#e8c97a"/><stop offset="100%" stopColor="#a07820"/></linearGradient></defs><path d="M12 2L13.9 10.1L22 12L13.9 13.9L12 22L10.1 13.9L2 12L10.1 10.1Z" fill="url(#bstarGrad)"/></svg>
            <span style={{ fontSize: 9, color: "#c9a94e", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase" }}>Charlotte</span>
          </div>

          {state === "thinking" ? (
            <div style={{ fontSize: Math.max(11, size * 0.13), color: "#c8d9a8", fontFamily: "DM Sans, sans-serif" }}>
              {bubbleText}
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
