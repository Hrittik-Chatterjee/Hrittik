"use client";

interface MenuBarProps {
  onOpenWindow: (id: string) => void;
}

export default function MenuBar({ onOpenWindow }: MenuBarProps) {
  const navItems = [
    { label: "Home", id: null },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Blog", id: "blog" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 28,
        background: "#C0C0C0",
        borderBottom: "2px solid",
        borderColor: "#808080",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 6px",
        boxShadow: "inset 0 1px #FFFFFF",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <span style={{ fontFamily: "'VT323', monospace", fontSize: 17, fontWeight: "bold", marginRight: 8, letterSpacing: 1 }}>
          🖥️ MyPortfolio
        </span>
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => item.id && onOpenWindow(item.id)}
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: 16,
              background: "transparent",
              border: "none",
              padding: "0 8px",
              cursor: "pointer",
              height: 24,
              color: "#000000",
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#000080";
              (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#000000";
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => onOpenWindow("contact")}
        style={{
          fontFamily: "'VT323', monospace",
          fontSize: 15,
          background: "#000080",
          color: "#FFFFFF",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "#6666BB #000033 #000033 #6666BB",
          padding: "0 10px",
          height: 22,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#0000AA")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#000080")}
      >
        ✉ Contact Me
      </button>
    </div>
  );
}
