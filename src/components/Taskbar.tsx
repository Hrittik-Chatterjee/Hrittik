"use client";

import { useEffect, useState } from "react";

interface TaskbarProps {
  openWindows: Array<{ id: string; title: string; icon?: string }>;
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartApp: (id: string) => void;
  onShutdown: () => void;
}

const WinLogo = () => (
  <svg width="16" height="16" viewBox="0 0 14 14" style={{ display: 'block', imageRendering: 'pixelated' }}>
    <path d="M0,3 l5,-1 v6 l-5,1 z" fill="#f02814"/>
    <path d="M6,2 l8,-2 v6 l-8,1 z" fill="#009400"/>
    <path d="M0,9 l5,-1 v6 l-5,-2 z" fill="#002dbd"/>
    <path d="M6,8 l8,-1 v7 l-8,-1 z" fill="#fffb00"/>
  </svg>
);

function MenuButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onMouseDown={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        background: "transparent",
        border: "none",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        fontSize: 16,
        fontFamily: "'VT323', monospace",
        color: "black"
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "#000080";
        (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = "black";
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default function Taskbar({ openWindows, activeWindowId, onWindowClick, onStartApp, onShutdown }: TaskbarProps) {
  const [time, setTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClick = () => setIsMenuOpen(false);
    if (isMenuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMenuOpen]);

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        height: 30,
        background: "#C0C0C0",
        borderTop: "2px solid #FFFFFF",
        boxShadow: "inset 0 1px #DFDFDF",
        display: "flex",
        alignItems: "center",
        padding: "0 4px",
        gap: 4,
      }}
    >
      {/* Start Menu Popup */}
      {isMenuOpen && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "100%",
            left: 0,
            width: 220,
            background: "#C0C0C0",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "#FFFFFF #404040 #404040 #FFFFFF",
            boxShadow: "2px 2px 0 #000",
            zIndex: 1000,
            display: "flex",
            fontFamily: "'VT323', monospace",
          }}
        >
          {/* Side Banner */}
          <div style={{ width: 30, background: "linear-gradient(to bottom, #000080, #1084D0)", display: "flex", alignItems: "flex-end", paddingBottom: 8 }}>
            <span style={{ color: "white", fontWeight: "bold", fontSize: 20, transform: "rotate(-90deg)", whiteSpace: "nowrap", transformOrigin: "left bottom", marginLeft: 24, letterSpacing: 1 }}>
              Hrittik 95
            </span>
          </div>
          {/* Menu Items */}
          <div style={{ flex: 1, padding: 2, display: "flex", flexDirection: "column" }}>
            <MenuButton icon="👨‍💻" label="About Me" onClick={() => { onStartApp("about"); setIsMenuOpen(false); }} />
            <MenuButton icon="🛠️" label="Skills" onClick={() => { onStartApp("skills"); setIsMenuOpen(false); }} />
            <MenuButton icon="📁" label="Projects" onClick={() => { onStartApp("projects"); setIsMenuOpen(false); }} />
            <MenuButton icon="✉️" label="Contact" onClick={() => { onStartApp("contact"); setIsMenuOpen(false); }} />
            <div style={{ height: 1, background: "#808080", borderBottom: "1px solid #FFF", margin: "4px 2px" }} />
            <MenuButton icon="🔗" label="GitHub" onClick={() => { window.open("https://github.com/Hrittik-Chatterjee", "_blank"); setIsMenuOpen(false); }} />
            <div style={{ height: 1, background: "#808080", borderBottom: "1px solid #FFF", margin: "4px 2px" }} />
            <MenuButton icon="🔌" label="Shut Down..." onClick={() => { onShutdown(); setIsMenuOpen(false); }} />
          </div>
        </div>
      )}

      {/* Start button */}
      <button
        style={{
          fontFamily: "'VT323', monospace",
          fontSize: 16,
          fontWeight: "bold",
          background: isMenuOpen ? "#d4d0c8" : "#C0C0C0",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: isMenuOpen ? "#808080 #FFFFFF #FFFFFF #808080" : "#FFFFFF #808080 #808080 #FFFFFF",
          height: 22,
          padding: "0 8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          boxShadow: isMenuOpen ? "inset 1px 1px #000" : "none",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <WinLogo />
        <span>Start</span>
      </button>

      {/* Separator */}
      <div
        style={{
          width: 2,
          height: 22,
          borderLeft: "1px solid #808080",
          borderRight: "1px solid #FFFFFF",
          margin: "0 2px",
          flexShrink: 0,
        }}
      />

      {/* Window buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, overflow: "hidden" }}>
        {openWindows.map((win) => {
          const isActive = activeWindowId === win.id;
          return (
            <button
              key={win.id}
              onClick={() => onWindowClick(win.id)}
              style={{
                fontFamily: "'VT323', monospace",
                fontSize: 14,
                background: "#C0C0C0",
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: isActive
                  ? "#808080 #FFFFFF #FFFFFF #808080"
                  : "#FFFFFF #808080 #808080 #FFFFFF",
                height: 22,
                padding: "0 8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                maxWidth: 150,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 12 }}>{win.icon || "📄"}</span>
              <span>{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* System tray */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 8px",
          height: 22,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "#808080 #FFFFFF #FFFFFF #808080",
          fontFamily: "'VT323', monospace",
          fontSize: 15,
          flexShrink: 0,
        }}
      >
        <span>🔊</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
