"use client";

import { useEffect, useState, useRef } from "react";

export default function DesktopClock() {
  const [display, setDisplay] = useState({ hours: "", minutes: "", date: "" });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 });

  useEffect(() => {
    // Start centered roughly
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight * 0.4 });
    setIsMounted(true);

    const update = () => {
      const now = new Date();
      setDisplay({
        hours: now.getHours().toString().padStart(2, "0"),
        minutes: now.getMinutes().toString().padStart(2, "0"),
        date: now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, initialX: position.x, initialY: position.y };

    const onMoveEv = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = ev.clientX - dragStart.current.x;
      const dy = ev.clientY - dragStart.current.y;
      setPosition({
        x: dragStart.current.initialX + dx,
        y: Math.max(30, dragStart.current.initialY + dy),
      });
    };

    const onUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", onMoveEv);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMoveEv);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <>
      <style>{`
        @keyframes float-block {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-15px); }
        }
        @keyframes blinker {
          50% { opacity: 0; }
        }
      `}</style>
      <div
        suppressHydrationWarning
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          top: isMounted ? position.y : "40%",
          left: isMounted ? position.x : "50%",
          animation: "float-block 6s ease-in-out infinite",
          textAlign: "center",
          pointerEvents: "auto",
          cursor: "grab",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          style={{
            background: "#e4dac4",
            border: "4px solid #000000",
            borderRadius: 8,
            padding: "16px 24px",
            boxShadow: "12px 12px 0px #000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* CRT Screen Area */}
          <div
            style={{
              background: "#000000",
              border: "4px solid #808080",
              borderRadius: 6,
              padding: "12px 24px",
              boxShadow: "inset 4px 4px 0px rgba(255,255,255,0.2), inset -4px -4px 0px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: 84,
                lineHeight: 1,
                color: "#4AF626",
                textShadow: "0 0 10px #4AF626, 0 0 20px #4AF626",
                letterSpacing: 4,
              }}
            >
              {display.hours}
              <span style={{ animation: "blinker 1s step-start infinite" }}>:</span>
              {display.minutes}
            </div>
          </div>

          {/* Sticker Date */}
          <div
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: 22,
              color: "#000",
              fontWeight: "bold",
              background: "#FFCC00",
              border: "3px solid #000",
              padding: "4px 16px",
              transform: "rotate(-3deg)",
              boxShadow: "4px 4px 0px #000",
              marginTop: 4,
            }}
          >
            🗓️ {display.date}
          </div>
        </div>
      </div>
    </>
  );
}
