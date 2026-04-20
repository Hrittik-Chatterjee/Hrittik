const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif";

const socials = [
  { name: "GitHub", url: "https://github.com/Hrittik-Chatterjee", icon: "🐙", color: "#24292e", handle: "@Hrittik-Chatterjee" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/hrittik-chatterjee/", icon: "💼", color: "#0077B5", handle: "hrittik-chatterjee" },
  { name: "Twitter / X", url: "https://twitter.com/hrittik_", icon: "🐦", color: "#1DA1F2", handle: "@hrittik_" },
  { name: "Instagram", url: "https://www.instagram.com/chatterjee.hrittik/", icon: "📸", color: "#E1306C", handle: "@chatterjee.hrittik" },
];

export default function ContactContent() {
  return (
    <div style={{ fontFamily: FONT, color: "#1a1a1a", fontSize: 15, lineHeight: 1.7 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px 0" }}>✉️ Get In Touch</h2>
      <p style={{ color: "#666", margin: "0 0 24px 0", fontSize: 14 }}>
        I&apos;m always happy to hear about new opportunities or just to say hi.
      </p>

      {/* Email card */}
      <div style={{
        borderRadius: 10, border: "1px solid #ebebeb",
        padding: "16px 18px", marginBottom: 20,
        background: "#f9feff",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <span style={{ fontSize: 28 }}>📧</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>Email</div>
          <a
            href="mailto:hrittik0chatterjee@gmail.com"
            style={{ color: "#0A84FF", fontWeight: 600, textDecoration: "none", fontSize: 15 }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.textDecoration = "underline")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.textDecoration = "none")}
          >
            hrittik0chatterjee@gmail.com
          </a>
        </div>
      </div>

      {/* Socials */}
      <div style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
        📡 Social Links
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 12,
              borderRadius: 10, border: "1px solid #ebebeb",
              padding: "12px 16px",
              color: "#1a1a1a", textDecoration: "none",
              background: "#fff",
              transition: "box-shadow 0.12s, transform 0.12s, border-color 0.12s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = `0 4px 16px ${s.color}22`;
              el.style.borderColor = s.color + "55";
              el.style.transform = "translateX(4px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "none";
              el.style.borderColor = "#ebebeb";
              el.style.transform = "translateX(0)";
            }}
          >
            <span style={{
              width: 36, height: 36, borderRadius: 8,
              background: s.color + "15", border: `1px solid ${s.color}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
            }}>
              {s.icon}
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{s.handle}</div>
            </div>
            <span style={{ marginLeft: "auto", color: "#ccc", fontSize: 18 }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
