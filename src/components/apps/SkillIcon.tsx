import React from "react";

const S: React.CSSProperties = { imageRendering: "pixelated", flexShrink: 0 };

export const skillIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  HTML: {
    color: "#E34F26",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <polygon points="6,2 26,2 24,26 16,30 8,26" fill="#E34F26" />
        <polygon points="16,4 24,4 22,24 16,28" fill="#EF652A" />
        <path d="M10 8 L22 8 L21 13 L11 13 L12 18 L16 18 L16 22 L11 20" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  CSS: {
    color: "#1572B6",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <polygon points="6,2 26,2 24,26 16,30 8,26" fill="#1572B6" />
        <polygon points="16,4 24,4 22,24 16,28" fill="#33A9DC" />
        <path d="M10 8 L22 8 M21 13 L16 13 L16 18 L20 18 L19 23 L16 24 L12 22" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  Bootstrap: {
    color: "#7952B3",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <rect x="4" y="4" width="24" height="24" rx="4" fill="#7952B3" />
        <text x="8" y="24" fontFamily="serif" fontSize="18" fontWeight="bold" fill="white">B</text>
      </svg>
    ),
  },
  TailwindCSS: {
    color: "#06B6D4",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <path d="M6 14 Q10 6 16 10 Q20 14 16 18 Q12 22 8 18 Q14 16 16 12 Q18 8 24 10 Q28 14 24 18 Q20 22 18 20" stroke="#06B6D4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  JavaScript: {
    color: "#F7DF1E",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <rect x="2" y="2" width="28" height="28" fill="#F7DF1E" />
        <text x="5" y="25" fontFamily="monospace" fontSize="14" fontWeight="bold" fill="#000">JS</text>
      </svg>
    ),
  },
  TypeScript: {
    color: "#3178C6",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <rect x="2" y="2" width="28" height="28" fill="#3178C6" />
        <text x="5" y="25" fontFamily="monospace" fontSize="14" fontWeight="bold" fill="white">TS</text>
      </svg>
    ),
  },
  React: {
    color: "#61DAFB",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <circle cx="16" cy="16" r="2.5" fill="#61DAFB" />
        <ellipse cx="16" cy="16" rx="13" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="16" cy="16" rx="13" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(-60 16 16)" />
      </svg>
    ),
  },
  "Redux Toolkit": {
    color: "#764ABC",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <circle cx="16" cy="7" r="4" fill="#764ABC" />
        <circle cx="6" cy="24" r="4" fill="#764ABC" />
        <circle cx="26" cy="24" r="4" fill="#764ABC" />
        <path d="M16 11 Q6 18 6 20 M6 20 Q18 20 26 20 M26 20 Q26 18 16 11" stroke="#764ABC" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  Redux: {
    color: "#764ABC",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <circle cx="16" cy="7" r="4" fill="#764ABC" />
        <circle cx="6" cy="24" r="4" fill="#764ABC" />
        <circle cx="26" cy="24" r="4" fill="#764ABC" />
        <path d="M16 11 Q6 18 6 20 M6 20 Q18 20 26 20 M26 20 Q26 18 16 11" stroke="#764ABC" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  "Node.js": {
    color: "#339933",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="#339933" />
        <text x="9" y="22" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="white">N</text>
      </svg>
    ),
  },
  "Express.js": {
    color: "#000000",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <rect x="2" y="2" width="28" height="28" fill="#222" />
        <text x="4" y="22" fontFamily="monospace" fontSize="9" fill="white">Exp</text>
      </svg>
    ),
  },
  Express: {
    color: "#000000",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <rect x="2" y="2" width="28" height="28" fill="#222" />
        <text x="4" y="22" fontFamily="monospace" fontSize="9" fill="white">Exp</text>
      </svg>
    ),
  },
  MongoDB: {
    color: "#47A248",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <path d="M16 3 Q10 14 10 21 Q10 28 16 29 Q22 28 22 21 Q22 14 16 3 Z" fill="#47A248" />
        <path d="M16 3 Q15 15 16 27 Q17 15 16 3 Z" fill="#A8D5A2" opacity="0.5" />
      </svg>
    ),
  },
  PostgreSQL: {
    color: "#336791",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <ellipse cx="16" cy="18" rx="9" ry="10" fill="#336791" />
        <ellipse cx="16" cy="10" rx="8" ry="7" fill="#336791" />
        <circle cx="13" cy="9" r="1.5" fill="white" />
        <circle cx="19" cy="9" r="1.5" fill="white" />
        <circle cx="13.5" cy="9.5" r="0.7" fill="#1a1a1a" />
        <circle cx="19.5" cy="9.5" r="0.7" fill="#1a1a1a" />
        <path d="M18 14 Q22 16 22 22 Q22 26 20 26" stroke="#4a90c4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M13 14 Q10 17 10 20" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="7" cy="11" rx="3.5" ry="5" fill="#4a90c4" />
        <circle cx="12" cy="7" r="1.2" fill="#6ab0d8" opacity="0.6" />
      </svg>
    ),
  },
  Firebase: {
    color: "#FFCA28",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <polygon points="7,28 16,4 21,14 25,9 25,28" fill="#FFCA28" />
        <polygon points="7,28 16,14 21,28" fill="#F57C00" opacity="0.8" />
      </svg>
    ),
  },
  Git: {
    color: "#F05032",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <path d="M29 15 L17 3 L14 6 L19 11 L6 11 L6 15 L19 15 L14 20 L17 23 Z" fill="#F05032" />
        <circle cx="8" cy="11" r="3" fill="#F05032" />
        <circle cx="8" cy="22" r="3" fill="#F05032" />
        <line x1="8" y1="14" x2="8" y2="19" stroke="#F05032" strokeWidth="2" />
      </svg>
    ),
  },
  GitHub: {
    color: "#24292e",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <circle cx="16" cy="16" r="14" fill="#24292e" />
        <path d="M16 6 Q9 6 9 14 Q9 19 12 21 Q12 22 12 23 L20 23 Q20 22 20 21 Q23 19 23 14 Q23 6 16 6 Z" fill="white" />
        <rect x="13" y="23" width="6" height="3" fill="#24292e" />
        <path d="M13 24 Q11 26 9 24" stroke="white" strokeWidth="1" fill="none" />
        <path d="M19 24 Q21 26 23 24" stroke="white" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  "VS Code": {
    color: "#007ACC",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <polygon points="4,8 16,16 4,24 2,22 12,16 2,10" fill="#007ACC" />
        <rect x="14" y="8" width="16" height="16" rx="2" fill="#007ACC" />
        <text x="16" y="22" fontFamily="monospace" fontSize="10" fontWeight="bold" fill="white">&gt;_</text>
      </svg>
    ),
  },
  Postman: {
    color: "#FF6C37",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <circle cx="16" cy="16" r="14" fill="#FF6C37" />
        <path d="M10 16 L22 16 M18 12 L22 16 L18 20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  Figma: {
    color: "#F24E1E",
    icon: (
      <svg viewBox="0 0 32 32" width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={S}>
        <rect x="8" y="2" width="8" height="8" rx="4" fill="#F24E1E" />
        <rect x="16" y="2" width="8" height="8" rx="4" fill="#FF7262" />
        <rect x="8" y="12" width="8" height="8" rx="2" fill="#A259FF" />
        <rect x="8" y="22" width="8" height="8" rx="4" fill="#0ACF83" />
        <circle cx="20" cy="16" r="4" fill="#1ABCFE" />
      </svg>
    ),
  },
};
