import { skillIcons } from "./SkillIcon";

const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif";

const categories = [
  {
    title: "Frontend",
    emoji: "🎨",
    color: "#E34F26",
    skills: ["HTML", "CSS", "Bootstrap", "TailwindCSS", "JavaScript", "TypeScript", "React", "Redux Toolkit"],
  },
  {
    title: "Backend",
    emoji: "⚙️",
    color: "#339933",
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Firebase"],
  },
  {
    title: "Tools & Others",
    emoji: "🔧",
    color: "#F05032",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Figma"],
  },
];

export default function SkillsContent() {
  return (
    <div style={{ fontFamily: FONT, color: "#1a1a1a", fontSize: 15, lineHeight: 1.7 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px 0" }}>🛠 Technical Skills</h2>
      <p style={{ color: "#666", margin: "0 0 24px 0", fontSize: 14 }}>A breakdown of my core technologies and tools.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {categories.map((cat) => (
          <div key={cat.title} style={{ borderRadius: 10, border: "1px solid #ebebeb", overflow: "hidden" }}>
            {/* Section header */}
            <div style={{
              background: cat.color + "12",
              borderBottom: `1px solid ${cat.color}22`,
              padding: "10px 16px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>{cat.emoji}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: cat.color }}>{cat.title}</span>
            </div>

            {/* Skill chips with icons */}
            <div style={{ padding: "14px 16px", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cat.skills.map((skill) => {
                const meta = skillIcons[skill];
                const color = meta?.color ?? cat.color;
                return (
                  <span
                    key={skill}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      fontSize: 13, fontWeight: 600,
                      padding: "5px 11px", borderRadius: 6,
                      background: "#f5f5f5",
                      border: `1.5px solid ${color}33`,
                      color: "#333",
                      cursor: "default",
                      transition: "all 0.12s",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = color + "18";
                      el.style.borderColor = color + "88";
                      el.style.transform = "translateY(-1px)";
                      el.style.boxShadow = `0 3px 10px ${color}22`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "#f5f5f5";
                      el.style.borderColor = color + "33";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {meta?.icon}
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
