"use client";

import { useState, useEffect } from "react";
import { BlogPost } from "@/lib/mdx";
import BlogContent from "./apps/BlogContent";
import ProjectsContent from "./apps/ProjectsContent";
import AboutContent from "./apps/AboutContent";
import ContactContent from "./apps/ContactContent";
import SkillsContent from "./apps/SkillsContent";
import DevRun from "./apps/games/DevRun";
import Snake from "./apps/games/Snake";
import TicTacToe from "./apps/games/TicTacToe";
import Minesweeper from "./apps/games/Minesweeper";
import { IconSvg } from "./DesktopIcon";

interface App {
  id: string;
  iconId?: string;
  title: string;
  content?: React.ReactNode;
  isFolder?: boolean;
}

export default function MobileLayout({ posts }: { posts: BlogPost[] }) {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const mainApps: App[] = [
    { id: "about", iconId: "about_mobile", title: "About Me", content: <AboutContent /> },
    { id: "projects", title: "Projects", content: <ProjectsContent /> },
    { id: "skills", title: "Skills", content: <SkillsContent /> },
    { id: "blog", title: "Blog Posts", content: <BlogContent posts={posts} /> },
    { id: "contact", title: "Contact", content: <ContactContent /> },
    { id: "games", title: "Games", isFolder: true },
  ];

  const gameApps: App[] = [
    { id: "devrun", title: "Dev Run", content: <DevRun /> },
    { id: "snake", title: "Snake", content: <Snake /> },
    { id: "tictactoe", title: "Tic-Tac-Toe", content: <TicTacToe /> },
    { id: "minesweeper", title: "Minesweeper", content: <Minesweeper /> },
  ];

  const currentApps = activeFolder === "games" ? gameApps : mainApps;
  const activeAppObj = currentApps.find((a) => a.id === activeApp);

  return (
    <div
      suppressHydrationWarning
      className="mobile-layout-container"
      style={{
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
        background: "#e4dac4",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E"), url('/hrittikretro.png')`,
        backgroundRepeat: "repeat, no-repeat",
        backgroundSize: "auto, cover",
        backgroundPosition: "top left, center center",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Heavy noise overlay to simulate CRT/Retro monitor texture */}
      <div
        suppressHydrationWarning
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
          opacity: 0.15,
          pointerEvents: "none",
          zIndex: 100,
        }}
      />

      {/* Status Bar */}
      <div
        style={{
          height: "30px",
          background: "#0000AA",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 12px",
          fontFamily: "'VT323', monospace",
          fontSize: "18px",
          borderBottom: "2px solid #FFFFFF",
          zIndex: 50,
        }}
      >
        <span>PORTFOLIO OS</span>
        <div style={{ display: "flex", gap: "10px" }}>
          <span>📶</span>
          <span>🔋</span>
          <span>{time}</span>
        </div>
      </div>

      {!activeAppObj ? (
        /* Home Screen or Folder Grid */
        <div style={{ flex: 1, display: "flex", flexDirection: "column", zIndex: 10 }}>
          {activeFolder && (
            <div
              style={{
                height: "40px",
                background: "#0000AA",
                color: "white",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                fontFamily: "'VT323', monospace",
                fontSize: "20px",
                borderBottom: "2px solid #FFFFFF",
              }}
            >
              <button
                onClick={() => setActiveFolder(null)}
                style={{
                  background: "#C0C0C0",
                  color: "black",
                  border: "2px solid",
                  borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
                  padding: "2px 12px",
                  marginRight: "16px",
                  fontFamily: "inherit",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                className="active:border-[inset]"
              >
                {"< Back"}
              </button>
              <span style={{ flex: 1, textAlign: "center", paddingRight: "70px" }}>
                {activeFolder === "games" ? "Games" : "Folder"}
              </span>
            </div>
          )}
          {!activeFolder && (
            <div
              style={{
                margin: "24px 24px 0",
                padding: "16px",
                background: "rgba(0, 0, 170, 0.4)",
                border: "2px solid #FFFFFF",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#FFFFFF",
                fontFamily: "'VT323', monospace",
                textShadow: "1px 1px 0 #000",
              }}
            >
              <div>
                <div style={{ fontSize: "36px", lineHeight: "1" }}>{time}</div>
                <div style={{ fontSize: "16px", color: "#C0C0C0" }}>
                  {new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "32px", lineHeight: "1" }}>☀️</div>
                <div style={{ fontSize: "18px" }}>72°F</div>
              </div>
            </div>
          )}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "min-content",
              gap: "24px",
              padding: "32px 24px",
              overflowY: "auto",
            }}
          >
            {currentApps.map((app) => (
              <div
                key={app.id}
                onClick={() => {
                  if (app.isFolder) {
                    setActiveFolder(app.id);
                  } else {
                    setActiveApp(app.id);
                  }
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <div
                style={{
                  width: "64px",
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.1)",
                  border: "2px solid transparent",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                }}
                className="active:bg-blue-900/50"
              >
                <IconSvg id={app.iconId || app.id} />
              </div>
              <span
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: "16px",
                  color: "#FFFFFF",
                  textShadow:
                    "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
                  textAlign: "center",
                  lineHeight: 1.1,
                }}
              >
                {app.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      ) : (
        /* App Full Screen View */
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#e4dac4",
            zIndex: 50,
          }}
        >
          {/* App Title Bar */}
          <div
            style={{
              height: "40px",
              background: "#0000AA",
              color: "white",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              fontFamily: "'VT323', monospace",
              fontSize: "20px",
              borderBottom: "2px solid #FFFFFF",
            }}
          >
            <button
              onClick={() => setActiveApp(null)}
              style={{
                background: "#C0C0C0",
                color: "black",
                border: "2px solid",
                borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
                padding: "2px 12px",
                marginRight: "16px",
                fontFamily: "inherit",
                fontSize: "16px",
                cursor: "pointer",
              }}
              className="active:border-[inset]"
            >
              {"< Back"}
            </button>
            <span style={{ flex: 1, textAlign: "center", paddingRight: "70px" }}>
              {activeAppObj.title}
            </span>
          </div>

          {/* App Content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              position: "relative",
              // Added inner container to pad content similar to a window
              padding: "8px",
            }}
          >
            {/* Wrapper to mimic window content area */}
            <div
              style={{
                background: "#FFFFFF",
                minHeight: "100%",
                border: "2px solid",
                borderColor: "#808080 #FFFFFF #FFFFFF #808080",
                position: "relative",
              }}
            >
              {activeAppObj.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
