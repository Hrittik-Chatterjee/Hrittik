"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


interface BSODProps {
  onRestart: () => void;
}

export default function BSOD({ onRestart }: BSODProps) {
  const [showCursor, setShowCursor] = useState(true);
  const [typed, setTyped] = useState("");

  const errorMsg =
    "A fatal exception 0E has occurred at 0028:C0FFEE00 in VXD HRITTIK(01) + 00010E36.\n" +
    "The current application will be terminated.\n\n" +
    "Error code: DEVELOPER_FELL_ASLEEP_WHILE_CODING\n" +
    "Module: PORTFOLIO.EXE\n" +
    "Cause: Too much MongoDB, too little sleep.\n\n" +
    "* Press any key to terminate the current application.\n" +
    "* Press CTRL+ALT+DEL to restart your computer. You will\n" +
    "  lose any unsaved information in all applications.";

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= errorMsg.length) {
        setTyped(errorMsg.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  // ESC or any key dismisses
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") onRestart();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onRestart]);

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0000AA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'VT323', monospace",
        color: "#AAAAAA",
      }}
    >
      {/* CRT scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 680, width: "90%", position: "relative" }}>
        {/* Header bar */}
        <div
          style={{
            background: "#AAAAAA",
            color: "#0000AA",
            padding: "4px 12px",
            marginBottom: 24,
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Windows 95
        </div>

        {/* Error body */}
        <pre
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 20,
            lineHeight: 1.5,
            color: "#AAAAAA",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            margin: "0 0 32px 0",
          }}
        >
          {typed}
          {showCursor && <span style={{ color: "#fff" }}>█</span>}
        </pre>

        {/* Separator */}
        <div
          style={{
            height: 2,
            background: "#AAAAAA",
            margin: "0 0 28px 0",
            opacity: 0.4,
          }}
        />

        {/* Restart button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={onRestart}
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: 22,
              background: "#AAAAAA",
              color: "#0000AA",
              border: "none",
              padding: "6px 32px",
              cursor: "pointer",
              fontWeight: "bold",
              letterSpacing: 1,
              transition: "background 0.12s, color 0.12s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#AAAAAA";
            }}
          >
            [ Press any key to return to desktop ]
          </button>
          <div style={{ marginTop: 12, fontSize: 15, color: "#7777cc" }}>
            Or press ESC to dismiss
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

