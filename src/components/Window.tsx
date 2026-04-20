"use client";

import { useState, useRef, ReactNode, useEffect } from "react";

interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  isOpen: boolean;
  isMinimized?: boolean;
  isActive: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onFocus: () => void;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

export default function Window({
  title,
  icon = "📄",
  isOpen,
  isMinimized = false,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  children,
  initialPosition = { x: 80, y: 40 },
  initialSize = { width: 1050, height: 510 },
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const savedLayout = useRef<{ position: typeof initialPosition; size: typeof initialSize } | null>(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasPositioned = useRef(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);

  useEffect(() => {
    if (isOpen && !hasPositioned.current) {
      // Center the window on the visible desktop area (between menubar and taskbar)
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const menuBarH = 28;
      const taskBarH = 30;
      const availH = vh - menuBarH - taskBarH;
      const centeredX = Math.max(0, Math.round((vw - initialSize.width) / 2));
      const centeredY = Math.max(menuBarH, Math.round(menuBarH + (availH - initialSize.height) / 2));
      setPosition({ x: centeredX, y: centeredY });
      hasPositioned.current = true;
    }
    if (!isOpen) {
      hasPositioned.current = false;
    }
  }, [isOpen, initialPosition]);

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      setIsClosing(false);
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsOpening(false));
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore
      if (savedLayout.current) {
        setPosition(savedLayout.current.position);
        setSize(savedLayout.current.size);
      }
      setIsMaximized(false);
    } else {
      // Snap to bottom-right
      savedLayout.current = { position: { ...position }, size: { ...size } };
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1400;
      const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
      const snapW = Math.round(vw * 0.85);
      const snapH = Math.round(vh * 0.80);
      setSize({ width: snapW, height: snapH });
      setPosition({ x: vw - snapW - 24, y: vh - snapH - 60 });
      setIsMaximized(true);
    }
  };

  if (!isOpen) return null;

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    isDragging.current = true;
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    onFocus();

    const onMove = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      setPosition({
        x: Math.max(0, ev.clientX - dragOffset.current.x),
        y: Math.max(28, ev.clientY - dragOffset.current.y),
      });
    };
    const onUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = size.width;
    const startH = size.height;

    const onMove = (ev: MouseEvent) => {
      if (!isResizing.current) return;
      setSize({
        width: Math.max(300, startW + (ev.clientX - startX)),
        height: Math.max(200, startH + (ev.clientY - startY)),
      });
    };
    const onUp = () => {
      isResizing.current = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const titleBg = isActive
    ? "linear-gradient(to right, #000080, #1084D0)"
    : "#808080";

  return (
    <div
      onMouseDown={onFocus}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isActive ? 50 : 10,
        background: "#ffffff",
        borderRadius: 12,
        boxShadow: isActive
          ? "0 24px 60px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.14)"
          : "0 8px 24px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
        overflow: "hidden",
        transition: "opacity 0.18s ease-out, transform 0.18s ease-in-out, box-shadow 0.18s ease",
        opacity: isOpening || isClosing || isMinimized ? 0 : 1,
        transform: isOpening || isClosing
          ? "scale(0.94) translateY(8px)"
          : isMinimized
          ? "translateY(120px) scale(0.85)"
          : "scale(1) translateY(0)",
        pointerEvents: isMinimized ? "none" : "auto",
        border: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={handleTitleMouseDown}
        style={{
          height: 44,
          background: isActive ? "#f5f5f5" : "#fafafa",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          cursor: "grab",
          flexShrink: 0,
          borderRadius: "12px 12px 0 0",
        }}
      >
        {/* Traffic light buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Close */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Close"
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 6, margin: 0, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              lineHeight: 0,
            }}
            onMouseEnter={e => {
              const dot = e.currentTarget.querySelector(".dot") as HTMLElement;
              const sym = e.currentTarget.querySelector(".sym") as HTMLElement;
              if (dot) dot.style.filter = "brightness(0.75)";
              if (sym) sym.style.opacity = "1";
            }}
            onMouseLeave={e => {
              const dot = e.currentTarget.querySelector(".dot") as HTMLElement;
              const sym = e.currentTarget.querySelector(".sym") as HTMLElement;
              if (dot) dot.style.filter = "brightness(1)";
              if (sym) sym.style.opacity = "0.45";
            }}
          >
            <span className="dot" style={{
              position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
              width: 13, height: 13, borderRadius: "50%",
              background: "#FF5F57", transition: "filter 0.12s", flexShrink: 0,
            }}>
              <span className="sym" style={{
                position: "absolute", color: "#7a1200", fontSize: 9, fontWeight: 900,
                lineHeight: 1, opacity: 0.45, transition: "opacity 0.12s",
                fontFamily: "system-ui, sans-serif", userSelect: "none",
              }}>✕</span>
            </span>
          </button>

          {/* Minimize */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); if (onMinimize) onMinimize(); }}
            onMouseDown={(e) => e.stopPropagation()}
            title="Minimize"
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 6, margin: 0, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              lineHeight: 0,
            }}
            onMouseEnter={e => {
              const dot = e.currentTarget.querySelector(".dot") as HTMLElement;
              const sym = e.currentTarget.querySelector(".sym") as HTMLElement;
              if (dot) dot.style.filter = "brightness(0.75)";
              if (sym) sym.style.opacity = "1";
            }}
            onMouseLeave={e => {
              const dot = e.currentTarget.querySelector(".dot") as HTMLElement;
              const sym = e.currentTarget.querySelector(".sym") as HTMLElement;
              if (dot) dot.style.filter = "brightness(1)";
              if (sym) sym.style.opacity = "0.45";
            }}
          >
            <span className="dot" style={{
              position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
              width: 13, height: 13, borderRadius: "50%",
              background: "#FEBC2E", transition: "filter 0.12s", flexShrink: 0,
            }}>
              <span className="sym" style={{
                position: "absolute", color: "#7a5200", fontSize: 11, fontWeight: 900,
                lineHeight: 1, opacity: 0.45, transition: "opacity 0.12s",
                fontFamily: "system-ui, sans-serif", userSelect: "none",
              }}>−</span>
            </span>
          </button>

          {/* Maximize */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            onMouseDown={(e) => e.stopPropagation()}
            title={isMaximized ? "Restore" : "Snap to bottom-right"}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 6, margin: 0, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              lineHeight: 0,
            }}
            onMouseEnter={e => {
              const dot = e.currentTarget.querySelector(".dot") as HTMLElement;
              const sym = e.currentTarget.querySelector(".sym") as HTMLElement;
              if (dot) dot.style.filter = "brightness(0.75)";
              if (sym) sym.style.opacity = "1";
            }}
            onMouseLeave={e => {
              const dot = e.currentTarget.querySelector(".dot") as HTMLElement;
              const sym = e.currentTarget.querySelector(".sym") as HTMLElement;
              if (dot) dot.style.filter = "brightness(1)";
              if (sym) sym.style.opacity = "0.45";
            }}
          >
            <span className="dot" style={{
              position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
              width: 13, height: 13, borderRadius: "50%",
              background: "#28C840", transition: "filter 0.12s", flexShrink: 0,
            }}>
              <span className="sym" style={{
                position: "absolute", color: "#0a5200", fontSize: 8, fontWeight: 900,
                lineHeight: 1, opacity: 0.45, transition: "opacity 0.12s",
                fontFamily: "system-ui, sans-serif", userSelect: "none",
              }}>{isMaximized ? "⤡" : "⤢"}</span>
            </span>
          </button>
        </div>

        {/* Centered title */}
        <div style={{
          position: "absolute",
          left: 0, right: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 7,
          pointerEvents: "none",
        }}>
          <span style={{ fontSize: 14 }}>{icon}</span>
          <span style={{
            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
          }}>
            {title}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          background: "#ffffff",
          fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
          fontSize: 15,
          color: "#1a1a1a",
          lineHeight: 1.65,
          padding: "24px 28px",
          position: "relative",
        }}
      >
        {children}
      </div>

      {/* Resize grip */}
      <div
        onMouseDown={handleResizeMouseDown}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 16,
          height: 16,
          cursor: "se-resize",
          zIndex: 10,
          opacity: 0.3,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M14 2L2 14M14 8L8 14M14 14L14 14' stroke='%23888' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
