"use client";

import { useState, useEffect } from "react";
import Desktop from "./Desktop";
import MobileLayout from "./MobileLayout";
import { BlogPost } from "@/lib/mdx";

export default function AppLayout({ posts }: { posts: BlogPost[] }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile === null) {
    // Render a placeholder background while detecting screen size to prevent flash
    return (
      <div
        suppressHydrationWarning
        style={{
          height: "100vh",
          width: "100vw",
          background: "#e4dac4",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E"), url('/hrittikretro.png')`,
          backgroundRepeat: "repeat, no-repeat",
          backgroundSize: "auto, cover",
          backgroundPosition: "top left, center center",
        }}
      />
    );
  }

  return isMobile ? <MobileLayout posts={posts} /> : <Desktop posts={posts} />;
}
