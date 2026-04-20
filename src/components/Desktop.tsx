"use client";

import { useState, useCallback, useEffect } from "react";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import MenuBar from "./MenuBar";
import BlogContent from "./apps/BlogContent";
import ProjectsContent from "./apps/ProjectsContent";
import AboutContent from "./apps/AboutContent";
import ContactContent from "./apps/ContactContent";
import SkillsContent from "./apps/SkillsContent";
import DesktopClock from "./DesktopClock";
import { BlogPost } from "@/lib/mdx";
import BSOD from "./BSOD";


import DevRun from "./apps/games/DevRun";
import Snake from "./apps/games/Snake";
import TicTacToe from "./apps/games/TicTacToe";
import Minesweeper from "./apps/games/Minesweeper";

interface App {
  id: string;
  title: string;
  icon: string;
  windowIcon: string;
  content: React.ReactNode;
}

const defaultIconPositions: Record<string, { x: number; y: number }> = {
  about: { x: 20, y: 40 },
  skills: { x: 20, y: 130 },
  projects: { x: 20, y: 220 },
  contact: { x: 20, y: 310 },
  blog: { x: 20, y: 400 },
  devrun: { x: 800, y: 40 },
  snake: { x: 800, y: 130 },
  tictactoe: { x: 800, y: 220 },
  minesweeper: { x: 800, y: 310 },
  postgres: { x: 300, y: 150 },
  mongodb: { x: 500, y: 350 },
  reactjs: { x: 150, y: 550 },
  html: { x: 600, y: 80 },
  css: { x: 750, y: 400 },
  javascript: { x: 400, y: 250 },
  typescript: { x: 200, y: 300 },
};

export default function Desktop({ posts }: { posts: BlogPost[] }) {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [windowPositions, setWindowPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [showBSOD, setShowBSOD] = useState(false);
  const [iconPositions, setIconPositions] = useState(defaultIconPositions);

  useEffect(() => {
    // Dynamically place game icons on the far right of the desktop
    const w = window.innerWidth;
    setIconPositions((prev) => ({
      ...prev,
      devrun: { x: w - 100, y: 40 },
      snake: { x: w - 100, y: 130 },
      tictactoe: { x: w - 100, y: 220 },
      minesweeper: { x: w - 100, y: 310 },
    }));
  }, []);

  const apps: App[] = [
    { id: "blog", title: "Blog Posts", icon: "📝", windowIcon: "📝", content: <BlogContent posts={posts} /> },
    { id: "projects", title: "Projects", icon: "📁", windowIcon: "📁", content: <ProjectsContent /> },
    { id: "about", title: "About Me", icon: "🖥️", windowIcon: "🖥️", content: <AboutContent /> },
    { id: "contact", title: "Contact", icon: "✉️", windowIcon: "✉️", content: <ContactContent /> },
    { id: "skills", title: "Skills", icon: "💾", windowIcon: "💾", content: <SkillsContent /> },
    { id: "devrun", title: "Dev Run", icon: "🕹️", windowIcon: "🕹️", content: <DevRun /> },
    { id: "snake", title: "Snake", icon: "🐍", windowIcon: "🐍", content: <Snake /> },
    { id: "tictactoe", title: "Tic-Tac-Toe", icon: "❌", windowIcon: "❌", content: <TicTacToe /> },
    { id: "minesweeper", title: "Minesweeper", icon: "💣", windowIcon: "💣", content: <Minesweeper /> },
  ];

  const openWindow = useCallback((id: string) => {
    setOpenWindows((prev) => {
      if (prev.includes(id)) return [...prev.filter((w) => w !== id), id];
      return [...prev, id];
    });
    setMinimizedWindows((prev) => prev.filter((w) => w !== id));
    setActiveWindow(id);
    setWindowPositions((prev) => {
      if (prev[id]) return prev;
      const count = Object.keys(prev).length;
      return { ...prev, [id]: { x: 120 + count * 25, y: 60 + count * 25 } };
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setActiveWindow((prev) => (prev === id ? null : prev));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveWindow(id);
    setOpenWindows((prev) => [...prev.filter((w) => w !== id), id]);
    setMinimizedWindows((prev) => prev.filter((w) => w !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setMinimizedWindows((prev) => [...prev, id]);
    setActiveWindow((prev) => (prev === id ? null : prev));
  }, []);

  const moveIcon = useCallback((id: string, pos: { x: number; y: number }) => {
    setIconPositions((prev) => ({ ...prev, [id]: pos }));
  }, []);

  const handleDesktopClick = () => {
    setActiveWindow(null);
  };

  return (
    <div
      suppressHydrationWarning
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#e4dac4",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E"), url('/hrittik_wallpaper_keycaps.png')`,
        backgroundRepeat: "repeat, no-repeat",
        backgroundSize: "auto, cover",
        backgroundPosition: "top left, center center",
        position: "relative",
      }}
      onClick={(e) => {
        // Only act if clicked on the bare desktop background, not on a child element
        if (e.target === e.currentTarget) {
          if (activeWindow) {
            minimizeWindow(activeWindow);
          }
        }
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
          zIndex: 10,
        }}
      />

      <MenuBar onOpenWindow={openWindow} />

      {/* Desktop SVGs Container */}
      <div style={{ position: 'absolute', top: 28, bottom: 30, left: 0, right: 0 }} suppressHydrationWarning>
        {apps.map((app) => (
          <DesktopIcon
            key={app.id}
            id={app.id}
            label={app.title}
            icon={app.icon}
            position={iconPositions[app.id] || { x: 20, y: 40 }}
            onOpen={openWindow}
            onMove={moveIcon}
          />
        ))}

        {/* Double-click hint */}
        <div
          suppressHydrationWarning
          style={{
            position: "absolute",
            bottom: 12,
            right: 16,
            fontFamily: "'VT323', monospace",
            fontSize: 14,
            color: "rgba(255,255,255,0.6)",
            textShadow: "1px 1px #000",
            pointerEvents: "none",
          }}
        >
          Double-click icons to open
        </div>

        <DesktopClock />
      </div>

      {/* Windows — conditionally rendered */}
      {openWindows.map((id) => {
        const app = apps.find((a) => a.id === id);
        if (!app) return null;
        return (
          <Window
            key={id}
            id={id}
            title={app.title}
            icon={app.windowIcon}
            isOpen
            isMinimized={minimizedWindows.includes(id)}
            isActive={activeWindow === id}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onFocus={() => focusWindow(id)}
            initialPosition={windowPositions[id] || { x: 120, y: 60 }}
          >
            {app.content}
          </Window>
        );
      })}

      <Taskbar
        openWindows={apps
          .filter((app) => openWindows.includes(app.id))
          .map((app) => ({ id: app.id, title: app.title, icon: app.windowIcon }))}
        activeWindowId={activeWindow}
        onWindowClick={focusWindow}
        onStartApp={openWindow}
        onShutdown={() => setShowBSOD(true)}
      />

      {showBSOD && <BSOD onRestart={() => setShowBSOD(false)} />}
    </div>
  );
}
