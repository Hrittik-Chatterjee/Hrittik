"use client";

import { useRef, useState } from "react";

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string;
  position: { x: number; y: number };
  onOpen: (id: string) => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
}

function IconSvg({ id }: { id: string }) {
  if (id === "blog") return (
    <svg viewBox="0 0 32 32" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="4" y="1" width="20" height="27" fill="white" stroke="black" strokeWidth="1" />
      <polygon points="20,1 24,5 20,5" fill="#C0C0C0" stroke="black" strokeWidth="1" />
      <polygon points="20,1 24,5 20,5" fill="white" />
      <line x1="7" y1="10" x2="21" y2="10" stroke="#0000AA" strokeWidth="1.5" />
      <line x1="7" y1="14" x2="21" y2="14" stroke="#0000AA" strokeWidth="1.5" />
      <line x1="7" y1="18" x2="21" y2="18" stroke="#0000AA" strokeWidth="1.5" />
      <line x1="7" y1="22" x2="15" y2="22" stroke="#0000AA" strokeWidth="1.5" />
    </svg>
  );
  if (id === "projects") return (
    <svg viewBox="0 0 32 32" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="11" width="28" height="17" fill="#FFCC00" stroke="black" strokeWidth="1" />
      <path d="M2 11 L2 13 L14 13 L16 11 Z" fill="#FFCC00" stroke="black" strokeWidth="1" />
      <rect x="4" y="15" width="24" height="2" fill="#CC9900" />
      <rect x="4" y="19" width="24" height="2" fill="#CC9900" />
    </svg>
  );
  if (id === "about") return (
    <svg viewBox="0 0 32 32" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="3" y="3" width="26" height="19" rx="1" fill="#C0C0C0" stroke="black" strokeWidth="1" />
      <rect x="5" y="5" width="22" height="15" fill="#0000AA" />
      <rect x="7" y="8" width="18" height="9" fill="#0000CC" />
      <line x1="9" y1="11" x2="23" y2="11" stroke="#00AAFF" strokeWidth="1" />
      <line x1="9" y1="14" x2="18" y2="14" stroke="#00AAFF" strokeWidth="1" />
      <rect x="13" y="22" width="6" height="4" fill="#C0C0C0" stroke="black" strokeWidth="1" />
      <rect x="9" y="26" width="14" height="2" fill="#C0C0C0" stroke="black" strokeWidth="1" />
    </svg>
  );
  if (id === "contact") return (
    <svg viewBox="0 0 32 32" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="2" y="7" width="28" height="18" fill="white" stroke="black" strokeWidth="1" />
      <polyline points="2,7 16,19 30,7" fill="none" stroke="#CC0000" strokeWidth="1.5" />
      <line x1="2" y1="25" x2="11" y2="16" stroke="#808080" strokeWidth="1" />
      <line x1="30" y1="25" x2="21" y2="16" stroke="#808080" strokeWidth="1" />
    </svg>
  );
  if (id === "skills") return (
    <svg viewBox="0 0 32 32" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <path d="M4,4 L28,4 L28,28 L4,28 Z" fill="#0000AA" stroke="black" strokeWidth="1" />
      <rect x="8" y="4" width="16" height="10" fill="gray" stroke="black" strokeWidth="1" />
      <rect x="10" y="18" width="12" height="10" fill="white" stroke="black" strokeWidth="1" />
    </svg>
  );
  if (id === "devrun") return (
    <svg viewBox="0 0 32 32" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="4" y="10" width="24" height="12" rx="2" fill="#C0C0C0" stroke="black" strokeWidth="1" />
      <rect x="7" y="14" width="6" height="6" fill="#404040" />
      <rect x="9" y="12" width="2" height="10" fill="#404040" />
      <circle cx="20" cy="18" r="2" fill="#CC0000" />
      <circle cx="24" cy="14" r="2" fill="#CC0000" />
    </svg>
  );
  if (id === "snake") return (
    <svg viewBox="0 0 32 32" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="6" y="6" width="20" height="20" fill="#000" stroke="black" strokeWidth="1" />
      <rect x="10" y="10" width="12" height="4" fill="#00FF00" />
      <rect x="18" y="14" width="4" height="4" fill="#00FF00" />
      <rect x="14" y="18" width="8" height="4" fill="#00FF00" />
      <rect x="14" y="22" width="4" height="4" fill="#00FF00" />
      <rect x="8" y="18" width="4" height="4" fill="#FF0000" />
    </svg>
  );
  if (id === "tictactoe") return (
    <svg viewBox="0 0 32 32" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="4" y="4" width="24" height="24" fill="white" stroke="black" strokeWidth="1" />
      <line x1="12" y1="6" x2="12" y2="26" stroke="black" strokeWidth="2" />
      <line x1="20" y1="6" x2="20" y2="26" stroke="black" strokeWidth="2" />
      <line x1="6" y1="12" x2="26" y2="12" stroke="black" strokeWidth="2" />
      <line x1="6" y1="20" x2="26" y2="20" stroke="black" strokeWidth="2" />
      <line x1="6" y1="6" x2="10" y2="10" stroke="#CC0000" strokeWidth="2" />
      <line x1="10" y1="6" x2="6" y2="10" stroke="#CC0000" strokeWidth="2" />
      <circle cx="24" cy="24" r="2.5" fill="none" stroke="#0000CC" strokeWidth="2" />
    </svg>
  );
  if (id === "minesweeper") return (
    <svg viewBox="0 0 32 32" width="40" height="40" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <rect x="4" y="4" width="24" height="24" fill="#C0C0C0" stroke="black" strokeWidth="1" />
      <circle cx="16" cy="18" r="6" fill="black" />
      <rect x="14" y="10" width="4" height="4" fill="black" />
      <path d="M16 10 Q20 6 24 10" fill="none" stroke="#CC0000" strokeWidth="1.5" />
      <polygon points="22,10 26,8 24,12" fill="#FFCC00" />
    </svg>
  );

  return <span style={{ fontSize: 32 }}>{}</span>;
}

export default function DesktopIcon({ id, label, position, onOpen, onMove }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, iconX: 0, iconY: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).focus();
    isDragging.current = true;
    hasMoved.current = false;
    setIsSelected(true);
    dragStart.current = { x: e.clientX, y: e.clientY, iconX: position.x, iconY: position.y };

    const onMoveEv = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = ev.clientX - dragStart.current.x;
      const dy = ev.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
      onMove(id, {
        x: Math.max(0, dragStart.current.iconX + dx),
        y: Math.max(32, dragStart.current.iconY + dy),
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
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: 72,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        cursor: "default",
        userSelect: "none",
        zIndex: isSelected ? 5 : 1,
        outline: "none",
      }}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onDoubleClick={() => onOpen(id)}
      onClick={() => setIsSelected(true)}
      onBlur={() => setIsSelected(false)}
    >
      <div
        style={{
          width: 52,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <IconSvg id={id} />
      </div>
      <span
        style={{
          fontFamily: "'VT323', monospace",
          fontSize: 14,
          color: "#FFFFFF",
          textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
          textAlign: "center",
          lineHeight: 1.2,
          wordBreak: "break-word",
          background: isSelected ? "rgba(0,0,128,0.7)" : "transparent",
          padding: "1px 3px",
          maxWidth: 72,
        }}
      >
        {label}
      </span>
    </div>
  );
}
