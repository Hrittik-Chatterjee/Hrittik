const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif";

const projects = [
  {
    title: "Nextflix",
    description: "An OTT (Over-the-Top) type streaming website with a Netflix-like UI.",
    tags: ["JavaScript", "HTML", "CSS"],
    status: "Completed",
    statusColor: "#28C840",
    emoji: "🎬",
  },
  {
    title: "Ninja Dev Quiz",
    description: "A comprehensive quiz application designed for developers to test their knowledge.",
    tags: ["React", "Web", "Quiz"],
    status: "Active",
    statusColor: "#0A84FF",
    emoji: "🥷",
  },
  {
    title: "Ticketing Web App",
    description: "A full-stack ticketing web application for managing support or event tickets.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    status: "Active",
    statusColor: "#0A84FF",
    emoji: "🎫",
  },
  {
    title: "Portfolio",
    description: "This retro-themed desktop portfolio website you're looking at right now!",
    tags: ["Next.js", "TypeScript", "React"],
    status: "Active",
    statusColor: "#0A84FF",
    emoji: "💼",
  },
];

export default function ProjectsContent() {
  return (
    <div style={{ fontFamily: FONT, color: "#1a1a1a", fontSize: 15, lineHeight: 1.7 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px 0" }}>📁 Projects</h2>
      <p style={{ color: "#666", margin: "0 0 24px 0", fontSize: 14 }}>A selection of things I've built.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {projects.map((project) => (
          <div
            key={project.title}
            style={{
              borderRadius: 10,
              border: "1px solid #ebebeb",
              padding: "16px 18px",
              background: "#fff",
              transition: "box-shadow 0.15s, transform 0.15s",
              cursor: "default",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "none";
              el.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>
                {project.emoji} {project.title}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 600,
                padding: "2px 8px", borderRadius: 20,
                background: project.statusColor + "18",
                color: project.statusColor,
                border: `1px solid ${project.statusColor}44`,
                whiteSpace: "nowrap", marginLeft: 8,
              }}>
                {project.status}
              </span>
            </div>
            <p style={{ margin: "0 0 10px 0", color: "#555", fontSize: 14 }}>{project.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 12, fontWeight: 600,
                    padding: "2px 9px", borderRadius: 5,
                    background: "#f0f0f0",
                    color: "#555",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
