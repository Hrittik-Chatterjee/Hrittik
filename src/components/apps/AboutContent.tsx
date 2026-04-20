import { skillIcons } from "./SkillIcon";

const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif";

const skillNames = [
  "HTML", "CSS", "Bootstrap", "JavaScript", "TypeScript",
  "React", "Redux", "Node.js", "Express.js", "MongoDB",
  "PostgreSQL", "Firebase", "TailwindCSS", "Git",
];

export default function AboutContent() {
  return (
    <div style={{ fontFamily: FONT, color: "#1a1a1a", fontSize: 15, lineHeight: 1.7 }}>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, marginTop: 0 }}>👤 Hrittik Chatterjee</h2>
      <p style={{ color: "#555", marginTop: 0, marginBottom: 20 }}>Junior Full Stack Developer · Sylhet, Bangladesh</p>

      <p style={{ marginBottom: 20 }}>
        I specialize in the <strong>MERN stack</strong> and thrive on creating dynamic, responsive web applications.
        My focus is on writing clean code and crafting intuitive user experiences.
      </p>

      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, background: "#f8f8f8", borderRadius: 10, padding: "14px 18px", border: "1px solid #eee" }}>
          <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#888" }}>⚙️ What I Do</div>
          <p style={{ margin: 0, fontSize: 14 }}>
            I build modern apps using MongoDB, Express.js, React, and Node.js.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 200, background: "#f8f8f8", borderRadius: 10, padding: "14px 18px", border: "1px solid #eee" }}>
          <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#888" }}>⚽ Interests</div>
          <p style={{ margin: 0, fontSize: 14 }}>
            Football (Forza Juventus!), geopolitics, history, and technology.
          </p>
        </div>
      </div>

      <div style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.05em", color: "#888", marginBottom: 12 }}>
        🛠 Skills
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skillNames.map((name) => {
          const meta = skillIcons[name];
          const color = meta?.color ?? "#888";
          return (
            <span
              key={name}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 11px",
                borderRadius: 6,
                background: "#f4f4f4",
                border: `1.5px solid ${color}33`,
                fontSize: 13,
                fontWeight: 600,
                color: "#222",
                cursor: "default",
                transition: "transform 0.1s, box-shadow 0.1s, background 0.1s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = `0 4px 12px ${color}44`;
                el.style.background = color + "14";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.background = "#f4f4f4";
              }}
            >
              {meta?.icon}
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
